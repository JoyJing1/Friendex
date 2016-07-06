class User < ActiveRecord::Base

  attr_reader :password

	validates :email, :password_digest, :session_token, presence: true
	validates :email, uniqueness: true
	validates :password, length: {minimum: 6}, allow_nil: :true
  has_one :profile, inverse_of: :user

  has_many :posts_authored,
    class_name: :Post,
    foreign_key: :author_id

  has_many :posts_received,
    class_name: :Post,
    foreign_key: :receiver_id

  has_many :images_authored,
    class_name: :Image,
    foreign_key: :author_id

  has_many :images_received,
    class_name: :Image,
    foreign_key: :receiver_id

  has_many :post_comments
  has_many :image_comments
  has_many :friendship_comments

  has_many :post_likes
  has_many :image_likes
  has_many :friendship_likes

	after_initialize :ensure_session_token
	before_validation :ensure_session_token_uniqueness

  def friends
    binds = {id: id}

    Friendship.find_by_sql([<<-SQL, binds])
      SELECT
        f.id,
        f.status,
        f.updated_at AS friendiversary,
        p.user_id AS friend_id,
        p.first_name,
        p.last_name,
        p.profile_img
      FROM friendships f
      JOIN profiles p ON p.user_id = f.requestor_id
      WHERE f.receiver_id = :id
        AND f.status = 'accepted'

      UNION

      SELECT
        f.id,
        f.status,
        f.updated_at AS friendiversary,
        p.user_id AS friend_id,
        p.first_name,
        p.last_name,
        p.profile_img
      FROM friendships f
      JOIN profiles p ON p.user_id = f.receiver_id
      WHERE f.requestor_id = :id
        AND f.status = 'accepted'

    SQL
  end

  def friend_requests_sent
    binds = {id: id}

    Friendship.find_by_sql([<<-SQL, binds])
      SELECT
        f.id,
        f.status,
        f.updated_at AS date_request_sent,
        p.user_id AS friend_id,
        p.first_name,
        p.last_name,
        p.profile_img
      FROM friendships f
      JOIN profiles p ON p.user_id = f.receiver_id
      WHERE f.requestor_id = :id
        AND f.status = 'pending'
    SQL
  end

  def friend_requests_received
    binds = {id: id}

    Friendship.find_by_sql([<<-SQL, binds])
      SELECT
        f.id,
        f.status,
        f.created_at AS date_request_sent,
        p.user_id AS friend_id,
        p.first_name,
        p.last_name,
        p.profile_img
      FROM friendships f
      JOIN profiles p ON p.user_id = f.requestor_id
      WHERE f.receiver_id = :id
        AND f.status = 'pending'
    SQL
  end

# User Authentication

  def self.find_by_credentials email, password
    user = User.find_by(email: email)
    return nil unless user
    user.password_is?(password) ? user : nil
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def password_is?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = new_session_token
    ensure_session_token_uniqueness
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def new_session_token
    SecureRandom.base64
  end

  def ensure_session_token_uniqueness
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
  end

end
