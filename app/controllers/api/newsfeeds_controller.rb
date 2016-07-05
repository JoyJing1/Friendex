class Api::NewsfeedsController < ApplicationController
  
  def show
    user = User.find(params["id"])
    ids = [ user.id ]

    user.friends.each do |friend|
      ids.push(friend.id)
    end

    posts = posts(ids)
    posts.each { |item| item.type = "post" }

    friendships = friendships(ids)
    friendships.each { |item| item.type = "friendship" }

    images = images(ids)
    images.each { |item| item.type = "image" }

    @newsfeed = posts.concat(friendships)
                      .concat(images)
                      .sort do |e1, e2|
                        e2.updated_at <=> e1.updated_at
                      end
    render "api/newsfeeds/show"
  end

  def images(ids)
    binds = {ids: ids}

    Image.find_by_sql([<<-SQL, binds])
      SELECT
        'image' AS type,
        i.id AS id,
        i.id AS image_id,
        i.author_id,
        prof_author.first_name AS author_first_name,
        prof_author.last_name AS author_last_name,
        prof_author.profile_img AS profile_img,
        i.receiver_id,
        prof_receiver.first_name AS receiver_first_name,
        prof_receiver.last_name AS receiver_last_name,
        i.created_at,
        i.updated_at,
        i.url
      FROM images i
        JOIN profiles prof_author ON i.author_id = prof_author.user_id
        JOIN profiles prof_receiver ON i.receiver_id = prof_receiver.user_id
      WHERE author_id IN (:ids)
        OR receiver_id IN (:ids)
    SQL
  end

  def posts(ids)
    binds = {ids: ids}

    Post.find_by_sql([<<-SQL, binds])
      SELECT
        'post' AS type,
        p.id AS id,
        p.id AS post_id,
        p.author_id,
        prof_author.first_name AS author_first_name,
        prof_author.last_name AS author_last_name,
        prof_author.profile_img AS profile_img,
        p.receiver_id,
        prof_receiver.first_name AS receiver_first_name,
        prof_receiver.last_name AS receiver_last_name,
        p.created_at,
        p.updated_at,
        p.body
      FROM posts p
        JOIN profiles prof_author ON p.author_id = prof_author.user_id
        JOIN profiles prof_receiver ON p.receiver_id = prof_receiver.user_id
      WHERE author_id IN (:ids)
        OR receiver_id IN (:ids)
    SQL
  end

  def friendships(ids)
    binds = {ids: ids}

    Friendship.find_by_sql([<<-SQL, binds])
      SELECT
        'friendship' AS type,
        f.id AS id,
        f.id AS friendship_id,
        f.requestor_id AS friend_id,
        f.receiver_id AS new_friend_id,
        prof_requestor.first_name AS friend_first_name,
        prof_requestor.last_name AS friend_last_name,
        prof_requestor.profile_img AS friend_img,
        prof_receiver.first_name AS new_friend_first_name,
        prof_receiver.last_name AS new_friend_last_name,
        prof_receiver.profile_img AS new_friend_img,
        f.created_at,
        f.updated_at
      FROM friendships f
        JOIN profiles prof_requestor ON f.requestor_id = prof_requestor.user_id
        JOIN profiles prof_receiver ON f.receiver_id = prof_receiver.user_id
      WHERE f.requestor_id IN (:ids)
        AND f.status = 'accepted'

      UNION

      SELECT
        'friendship' AS type,
        f.id AS id,
        f.id AS friendship_id,
        f.receiver_id AS friend_id,
        f.requestor_id AS new_friend_id,
        prof_receiver.first_name AS friend_first_name,
        prof_receiver.last_name AS friend_last_name,
        prof_receiver.profile_img AS friend_img,
        prof_requestor.first_name AS new_friend_first_name,
        prof_requestor.last_name AS new_friend_last_name,
        prof_requestor.profile_img AS new_friend_img,
        f.created_at,
        f.updated_at
      FROM friendships f
        JOIN profiles prof_receiver ON f.receiver_id = prof_receiver.user_id
        JOIN profiles prof_requestor ON f.requestor_id = prof_requestor.user_id
      WHERE f.receiver_id IN (:ids)
        AND f.status = 'accepted'
    SQL
  end

end
