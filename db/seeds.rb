# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require_relative 'seed_imgs'

my_rand = Random.new(4928)

# User.destroy_all()
# Profile.destroy_all()
# Friendship.destroy_all()
# Post.destroy_all()
#

# INITIAL SEEDING ###################################################
User.create!(email: "mark@facebook.com", password: "testtest", username: "Mark Zuckerberg")
User.create!(email: "sheryl@facebook.com", password: "testtest", username: "Sheryl Sandberg")
User.create!(email: "marc@facebook.com", password: "testtest", username: "Marc Andreessen")
User.create!(email: "sundar@gmail.com", password: "testtest", username: "Sundar Pichai")
User.create!(email: "larry@gmail.com", password: "testtest", username: "Larry Page")
User.create!(email: "sergey@gmail.com", password: "testtest", username: "Sergey Brin")
User.create!(email: "jan@whatsapp.com", password: "testtest", username: "Jan Koum")
User.create!(email: "jeff@linkedin.com", password: "testtest", username: "Jeff Weiner")

# FRIENDSHIPS AMONGST SPECIAL USERS ########################################################

Friendship.create!(requestor_id: 2, receiver_id: 1, status: "accepted", updated_at: Faker::Time.between(90.days.ago, DateTime.now, :all))
Friendship.create!(requestor_id: 5, receiver_id: 2, status: "accepted", updated_at: Faker::Time.between(90.days.ago, 7.days.ago, :all))
Friendship.create!(requestor_id: 6, receiver_id: 7, status: "accepted", updated_at: Faker::Time.between(90.days.ago, 7.days.ago, :all))
Friendship.create!(requestor_id: 6, receiver_id: 8, status: "accepted", updated_at: Faker::Time.between(90.days.ago, 7.days.ago, :all))
Friendship.create!(requestor_id: 1, receiver_id: 5, status: "accepted", updated_at: Faker::Time.between(90.days.ago, 7.days.ago, :all))
Friendship.create!(requestor_id: 1, receiver_id: 6, status: "accepted", updated_at: Faker::Time.between(90.days.ago, 7.days.ago, :all))
Friendship.create!(requestor_id: 4, receiver_id: 3, status: "pending")
Friendship.create!(requestor_id: 5, receiver_id: 3, status: "pending")
Friendship.create!(requestor_id: 6, receiver_id: 5, status: "pending")
Friendship.create!(requestor_id: 3, receiver_id: 1, status: "pending")
Friendship.create!(requestor_id: 4, receiver_id: 1, status: "pending")
Friendship.create!(requestor_id: 3, receiver_id: 2, status: "pending")
Friendship.create!(requestor_id: 4, receiver_id: 2, status: "pending")
Friendship.create!(requestor_id: 6, receiver_id: 2, status: "pending")
Friendship.create!(requestor_id: 1, receiver_id: 7, status: "pending")
Friendship.create!(requestor_id: 1, receiver_id: 8, status: "pending")

# POSTS AMONGST SPECIAL USERS ########################################################

10.times do
  posted_at = Faker::Time.between(90.days.ago, 7.days.ago, :all)

  Post.create!(
    author_id: my_rand.rand(1..8),
    receiver_id: my_rand.rand(1..8),
    body: Faker::Hacker.say_something_smart,
    created_at: posted_at,
    updated_at: posted_at
  )

  Post.create!(
    author_id: my_rand.rand(1..8),
    receiver_id: my_rand.rand(1..8),
    body: Faker::StarWars.quote,
    created_at: posted_at,
    updated_at: posted_at
  )
end

# COMMENTS AMONGST SPECIAL USERS ########################################################

10.times do
  posted_at = Faker::Time.between(7.days.ago, DateTime.now, :all)

  PostComment.create!(
    post_id: my_rand.rand(1..20),
    user_id: my_rand.rand(1..8),
    body: Faker::Hacker.say_something_smart
  )

  PostComment.create!(
    post_id: my_rand.rand(1..20),
    user_id: my_rand.rand(1..8),
    body: Faker::StarWars.quote
  )
end

# LIKES AMONGST SPECIAL USERS ########################################################

30.times do
  PostLike.create!(
    post_id: my_rand.rand(1..20),
    user_id: my_rand.rand(1..8)
  )

  ImageLike.create!(
    image_id: my_rand.rand(1..20),
    user_id: my_rand.rand(1..8)
  )

  FriendshipLike.create!(
    friendship_id: my_rand.rand(1..6),
    user_id: my_rand.rand(1..8)
  )
end

# Mark's Photos

SCUBA.each_with_index do |url, i|
  posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)

  # if i < 4
  Image.create!(
    author_id: 1,
    receiver_id: 1,
    url: url,
    created_at: posted_at,
    updated_at: posted_at)
  # else
  #   Image.create!(
  #     author_id: 5,
  #     receiver_id: 5,
  #     url: url,
  #     created_at: posted_at,
  #     updated_at: posted_at)
  # end
end

30.times do
  ImageComment.create!(
    image_id: my_rand.rand(1..29),
    user_id: my_rand.rand(1..8),
    body: Faker::Hacker.say_something_smart
  )
end

# SPECIFIC USERS #########################################################

# Facebook
Profile.create!(user_id: 1,
    first_name: "Mark",
    last_name: "Zuckerberg",
    birthday: "1984-05-14",
    gender: "male",
    relationship: "married",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467155555/profiles/mark_zucker_profile.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339505/backgrounds/Lakes.jpg",
    workplace: "Facebook",
    current_city: "Menlo Park, CA")

Profile.create!(user_id: 2,
    first_name: "Sheryl",
    last_name: "Sandberg",
    birthday: "1969-08-28",
    gender: "female",
    relationship: "married",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1468021043/profiles/Sheryl-Sandberg.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339268/backgrounds/panorama-sali2000.jpg",
    workplace: "Facebook",
    current_city: "Menlo Park, CA",
    hometown: "Washington D.C.")

Profile.create!(user_id: 3,
    first_name: "Marc",
    last_name: "Andreessen",
    birthday: "1971-07-09",
    gender: "male",
    relationship: "married",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467945109/profiles/Marc-Andreessen.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339250/backgrounds/_DSC1434.jpg",
    current_city: "Menlo Park, CA",
    workplace: "Facebook")

# Google
Profile.create!(user_id: 4,
    first_name: "Sundar",
    last_name: "Pichai",
    birthday: "1972-07-12",
    gender: "male",
    relationship: "married",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467947804/profiles/9hpv14pc.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339181/backgrounds/4964-4967.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

Profile.create!(user_id: 5,
    first_name: "Larry",
    last_name: "Page",
    birthday: "1973-03-26",
    gender: "male",
    relationship: "married",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467941834/profiles/photo.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339155/backgrounds/20160278092778-1bb97924-xx.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

Profile.create!(user_id: 6,
    first_name: "Sergey",
    last_name: "Brin",
    birthday: "1973-08-21",
    gender: "male",
    relationship: "single",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467157152/profiles/Sergey-Brin.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339046/backgrounds/ultra_wide_hougang_hdr_by_draken413o.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

# Whatsapp
Profile.create!(user_id: 7,
    first_name: "Jan",
    last_name: "Koum",
    birthday: "1976-02-24",
    gender: "male",
    relationship: "single",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467944951/profiles/0303_whatsapp-jan-koum-1_1024x576.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467338932/backgrounds/photo-1414694762283-acccc27bca85.jpg",
    hometown: "Fastiv, Ukraine",
    workplace: "Whatsapp")

Profile.create!(user_id: 8,
    first_name: "Jeff",
    last_name: "Weiner",
    birthday: "1970-02-21",
    gender: "male",
    relationship: "married",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467947873/profiles/linkedin-ceo-jeff-weiner-explains-his-no-1-management-principle.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339201/backgrounds/manali_to_leh_road.jpg",
    current_city: "New York City, NY",
    workplace: "LinkedIn")

# MISCELLANEOUS USERS #######################################################################
# WOMEN.each_with_index do |profile_img, i|
#   fname = FactoryHelper::Name.first_name
#   lname = FactoryHelper::Name.last_name
#
#   User.create!(
#     email: FactoryHelper::Internet.free_email(fname),
#     password: "testtest",
#     username: "#{fname} #{lname}")
#
#   Profile.create!(
#     user_id: i+9,
#     first_name: fname,
#     last_name: lname,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: "female",
#     relationship: RELATIONSHIPS[my_rand.rand(0...RELATIONSHIPS.length)],
#     profile_img: profile_img,
#     background_img: BACKGROUNDS[my_rand.rand(0...BACKGROUNDS.length)],
#     current_city: "#{FactoryHelper::Address.city}, #{FactoryHelper::Address.state_abbr}",
#     workplace: FactoryHelper::Company.name
#   )
# end

# MEN.each_with_index do |profile_img, i|
#   fname = FactoryHelper::Name.first_name
#   lname = FactoryHelper::Name.last_name
#
#   User.create!(
#     email: FactoryHelper::Internet.free_email(fname),
#     password: "testtest",
#     username: "#{fname} #{lname}")
#
#   Profile.create!(
#     user_id: i+78,
#     first_name: fname,
#     last_name: lname,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: "male",
#     relationship: RELATIONSHIPS[my_rand.rand(0...RELATIONSHIPS.length)],
#     profile_img: profile_img,
#     background_img: BACKGROUNDS[my_rand.rand(0...BACKGROUNDS.length)],
#     current_city: "#{FactoryHelper::Address.city}, #{FactoryHelper::Address.state_abbr}",
#     workplace: FactoryHelper::Company.name
#   )
# end

# 100.times do
#   requestor_id = my_rand.rand(9..78)
#   receiver_id = my_rand.rand(9..78)
#   next if requestor_id == receiver_id
#
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Friendship.create!(
#     requestor_id: requestor_id,
#     receiver_id: receiver_id,
#     status: "accepted",
#     updated_at: posted_at,
#     created_at: posted_at
#   )
# end

# POSTS ##############################################################

# 100.times do
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Post.create!(
#     author_id: my_rand.rand(9..78),
#     receiver_id: my_rand.rand(9..78),
#     body: Faker::Hacker.say_something_smart,
#     created_at: posted_at,
#     updated_at: posted_at
#   )
#
#   Post.create!(
#     author_id: my_rand.rand(9..78),
#     receiver_id: my_rand.rand(9..78),
#     body: Faker::StarWars.quote,
#     created_at: posted_at,
#     updated_at: posted_at
#   )
# end

## PHOTOS / IMAGES #######################################################

# CAPYBARA.each do |url|
#   Image.create!(
#     author_id: my_rand.rand(9..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url)
# end

# OTTERS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(2..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# FAMILIES.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(2..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# DOGS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(2..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end
#
# CATS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(2..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# RABBITS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(2..78),
#     receiver_id: my_rand.rand(2..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

SNOW.each do |url|
  posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)

  Image.create!(
    author_id: my_rand.rand(2..8),
    receiver_id: my_rand.rand(2..8),
    url: url,
    created_at: posted_at,
    updated_at: posted_at)
end

# BEACH.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(2..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

SURFING.each do |url|
  posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)

  Image.create!(
    author_id: my_rand.rand(2..8),
    receiver_id: my_rand.rand(2..8),
    url: url,
    created_at: posted_at,
    updated_at: posted_at)
end

# PIGS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(9..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# PANDAS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(9..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# BIRDS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(9..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# PENGUINS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(2..78),
#     receiver_id: my_rand.rand(2..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# RABBITS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(2..78),
#     receiver_id: my_rand.rand(2..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# OTTERS.each do |url|
#   posted_at = Faker::Time.between(90.days.ago, DateTime.now, :all)
#
#   Image.create!(
#     author_id: my_rand.rand(9..78),
#     receiver_id: my_rand.rand(9..78),
#     url: url,
#     created_at: posted_at,
#     updated_at: posted_at)
# end

# CREATE COMMENTS & LIKES FOR RANDOM USERS

# 100.times do
#   PostComment.create!(
#     post_id: my_rand.rand(41..120),
#     user_id: my_rand.rand(9..78),
#     body: Faker::Hacker.say_something_smart
#   )
#
#   PostComment.create!(
#     post_id: my_rand.rand(41..120),
#     user_id: my_rand.rand(9..78),
#     body: Faker::StarWars.quote
#   )
#
#   PostLike.create!(
#     post_id: my_rand.rand(41..120),
#     user_id: my_rand.rand(9..78),
#   )
#
#   ImageLike.create!(
#     image_id: my_rand.rand(1..108),
#     user_id: my_rand.rand(9..78),
#   )
#
#   FriendshipLike.create!(
#     friendship_id: my_rand.rand(1..120),
#     user_id: my_rand.rand(1..78),
#   )
# end
