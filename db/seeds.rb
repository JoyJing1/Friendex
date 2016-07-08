# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
my_rand = Random.new(4928)

User.destroy_all()
Profile.destroy_all()
Friendship.destroy_all()
# Post.destroy_all()

User.create!(email: "mark@facebook.com", password: "testtest", username: "Mark Zuckerberg")
User.create!(email: "sheryl@facebook.com", password: "testtest", username: "Sheryl Sandberg")
User.create!(email: "marc@facebook.com", password: "testtest", username: "Marc Andreessen")
User.create!(email: "sundar@gmail.com", password: "testtest", username: "Sundar Pichai")
User.create!(email: "larry@gmail.com", password: "testtest", username: "Larry Page")
User.create!(email: "sergey@gmail.com", password: "testtest", username: "Sergey Brin")
User.create!(email: "jan@whatsapp.com", password: "testtest", username: "Jan Koum")
User.create!(email: "jeff@linkedin.com", password: "testtest", username: "Jeff Weiner")

Friendship.create!(requestor_id: 2, receiver_id: 1, status: "pending")
Friendship.create!(requestor_id: 3, receiver_id: 1, status: "pending")
Friendship.create!(requestor_id: 4, receiver_id: 1, status: "pending")
Friendship.create!(requestor_id: 3, receiver_id: 2, status: "pending")
Friendship.create!(requestor_id: 4, receiver_id: 2, status: "pending")
Friendship.create!(requestor_id: 6, receiver_id: 2, status: "pending")
Friendship.create!(requestor_id: 5, receiver_id: 2, status: "accepted")
Friendship.create!(requestor_id: 4, receiver_id: 3, status: "pending")
Friendship.create!(requestor_id: 5, receiver_id: 3, status: "pending")
Friendship.create!(requestor_id: 6, receiver_id: 5, status: "pending")
Friendship.create!(requestor_id: 6, receiver_id: 7, status: "accepted")
Friendship.create!(requestor_id: 6, receiver_id: 8, status: "accepted")
Friendship.create!(requestor_id: 1, receiver_id: 5, status: "accepted")
Friendship.create!(requestor_id: 1, receiver_id: 6, status: "accepted")
Friendship.create!(requestor_id: 1, receiver_id: 7, status: "pending")
Friendship.create!(requestor_id: 1, receiver_id: 8, status: "pending")

20.times do
  Post.create!(author_id: my_rand.rand(1..8), receiver_id: my_rand.rand(1..8), body: Faker::Hacker.say_something_smart )
  Post.create!(author_id: my_rand.rand(1..8), receiver_id: my_rand.rand(1..8), body: Faker::StarWars.quote )
  # Post.create!(author_id: my_rand.rand(0..8), receiver_id: my_rand.rand(0..2), body: Faker::ChuckNorris.fact )
end

# Faker::StarWars.quote

#
# Faker::ChuckNorris.fact
# Faker::Avatar.image
#
# User.create!
# Profile.create!()


# (9..30).each |i| do
#   User.create(email: Faker::Internet.email, password: "password")
#   Profile.create!(user_id: i,
#     first_name:
#     )
# end

# Facebook
Profile.create!(user_id: 1,
    first_name: "Mark",
    last_name: "Zuckerberg",
    birthday: "1984-05-14",
    gender: "male",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467155555/profiles/mark_zucker_profile.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339505/backgrounds/Lakes.jpg",
    workplace: "Facebook",
    current_city: "Menlo Park, CA")

Profile.create!(user_id: 2,
    first_name: "Sheryl",
    last_name: "Sandberg",
    birthday: "1969-08-28",
    gender: "female",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/c_crop,h_350,w_350/v1467198451/profiles/sheryl-sandberg-hed-2014.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339268/backgrounds/panorama-sali2000.jpg",
    workplace: "Facebook",
    current_city: "Menlo Park, CA",
    hometown: "Washington D.C.")

Profile.create!(user_id: 3,
    first_name: "Marc",
    last_name: "Andreessen",
    birthday: "1971-07-09",
    gender: "male",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/c_crop,h_600,w_600/v1467157354/profiles/150518_r26512-1200-630-06150519.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339250/backgrounds/_DSC1434.jpg",
    current_city: "Menlo Park, CA",
    workplace: "Facebook")

# Google
Profile.create!(user_id: 4,
    first_name: "Sundar",
    last_name: "Pichai",
    birthday: "1972-07-12",
    gender: "male",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/c_crop,h_300,w_300,x_80/v1467156929/profiles/SundarPichai129-_2.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339181/backgrounds/4964-4967.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

Profile.create!(user_id: 5,
    first_name: "Larry",
    last_name: "Page",
    birthday: "1973-03-26",
    gender: "male",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467941834/profiles/photo.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339155/backgrounds/20160229092748-1bb97924-xx.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

Profile.create!(user_id: 6,
    first_name: "Sergey",
    last_name: "Brin",
    birthday: "1973-08-21",
    gender: "male",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/c_crop,h_400,w_400/v1467157152/profiles/Sergey-Brin.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339046/backgrounds/ultra_wide_hougang_hdr_by_draken413o.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

# Whatsapp
Profile.create!(user_id: 7,
    first_name: "Jan",
    last_name: "Koum",
    birthday: "1976-02-24",
    gender: "male",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/c_crop,h_360,w_360/v1467198808/profiles/jan-koum-whatsapp.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467338932/backgrounds/photo-1414694762283-acccc27bca85.jpg",
    hometown: "Fastiv, Ukraine",
    workplace: "Whatsapp")

Profile.create!(user_id: 8,
    first_name: "Jeff",
    last_name: "Weiner",
    birthday: "1970-02-21",
    gender: "male",
    profile_img: "https://res.cloudinary.com/joyjing1/image/upload/c_crop,h_1124,w_1124,x_50/v1467198942/profiles/linkedin-ceo-jeff-weiner-explains-how-fixing-a-common-mistake-helped-him-grow-as-a-leader.jpg",
    background_img: "https://res.cloudinary.com/joyjing1/image/upload/v1467339201/backgrounds/manali_to_leh_road.jpg",
    current_city: "New York City, NY",
    workplace: "LinkedIn")

backgrounds = [
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339505/backgrounds/Lakes.jpg", "http://res.cloudinary.com/joyjing1/image/upload/v1467339268/backgrounds/panorama-sali2000.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339250/backgrounds/_DSC1434.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339241/backgrounds/_DSC0320.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339201/backgrounds/manali_to_leh_road.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339181/backgrounds/4964-4967.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339155/backgrounds/20160229092748-1bb97924-xx.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339137/backgrounds/unionsquare_panorama_wideangle_306923_o.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339102/backgrounds/landscape-photography-argentina-landscape-lenticular-cloud-natural-landscape-panorama-patagonia-ultra-wide-angle-lens-landscape-1643236926.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467339046/backgrounds/ultra_wide_hougang_hdr_by_draken413o.jpg",
  "http://res.cloudinary.com/joyjing1/image/upload/v1467338932/backgrounds/photo-1414694762283-acccc27bca85.jpg"]

#Figure out why FactoryHelper not letting me specify male/female names
# (9..20).each do |i|
#   username = "#{Faker::Name.first_name} #{Faker::Name.last_name}"
#   User.create(email: Faker::Internet.email, password: "password", username: username)
#   Profile.create!(user_id: i,
#     first_name: username.split(' ').first,
#     last_name: username.split(' ').last,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: "female",
#     workplace: Faker::Company.name,
#     # school: Faker::Educator.university,
#     current_city: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
#     hometown: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
#     profile_img: Faker::Avatar.image,
#     background_img: backgrounds[my_rand.rand(0...backgrounds.length)] )
# end

# (21..30).each do |i|
#   username = "#{Faker::Name.first_name} #{Faker::Name.last_name}"
#   User.create(email: Faker::Internet.email, password: "password", username: username)
#   Profile.create!(user_id: i,
#     first_name: username.split(' ').first,
#     last_name: username.split(' ').last,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: "male",
#     workplace: Faker::Company.name,
#     # school: Faker::Educator.university,
#     current_city: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
#     hometown: "#{Faker::Address.city}, #{Faker::Address.state_abbr}",
#     profile_img: Faker::Avatar.image,
#     background_img: backgrounds[my_rand.rand(0...backgrounds.length)] )
# end
#
# 20.times do
#   requestor_id = my_rand.rand(0..30)
#   receiver_id = my_rand.rand(0..30)
#   next if requestor_id == receiver_id
#   Friendship.create!(requestor_id: requestor_id, receiver_id: receiver_id, status: "pending")
# end

# 20.times do
#   requestor_id = my_rand.rand(0..30)
#   receiver_id = my_rand.rand(0..30)
#   prev_friendship = Friendship.where(requestor_id: requestor_id, receiver_id: receiver_id)
#   prev_friendship_opp = Friendship.where(requestor_id: receiver_id, receiver_id: requestor_id)
#
#   if prev_friendship.empty? && prev_friendship_opp.empty?
#     Friendship.create!(requestor_id: requestor_id, receiver_id: receiver_id, status: "accepted")
#   end
# end
#
# 20.times do
#   Post.create!(author_id: my_rand.rand(0..30), receiver_id: my_rand.rand(0..30), body: Faker::Hacker.say_something_smart )
#   Post.create!(author_id: my_rand.rand(0..8), receiver_id: my_rand.rand(0..2), body: Faker::StarWars.quote )
#   # Post.create!(author_id: my_rand.rand(0..8), receiver_id: my_rand.rand(0..2), body: Faker::ChuckNorris.fact )
# end

# (9..20).each |i| do
#   Profile.create(user_id: i, first_name: FactoryHelper::Name.female_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: "female")
# end
#
# (21..29).each |i| do
#   Profile.create(user_id: i, first_name: FactoryHelper::Name.male_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: "male")
# end


# User.create!([
#   {email: "test", password: "testtest"},
#   {email: Faker::Internet.email, password: "password"},
#   {email: Faker::Internet.email, password: "password"},
#   {email: Faker::Internet.email, password: "password"},
#   {email: Faker::Internet.email, password: "password"},
#   {email: Faker::Internet.email, password: "password"},
#   {email: Faker::Internet.email, password: "password"},
#   {email: Faker::Internet.email, password: "password"},
#   {email: Faker::Internet.email, password: "password"},
#   {email: Faker::Internet.email, password: "password"}
# ])
#
#
# Profile.create!([
#   {user_id: 1, first_name: "Mark",
#     last_name: "Zuckerberg",
#     birthday: "1984-05-14",
#     gender: "male"
#   },
#   {user_id: 2, first_name: FactoryHelper::Name.female_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   },
#   {user_id: 3, first_name: FactoryHelper::Name.female_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   },
#   {user_id: 4, first_name: FactoryHelper::Name.female_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   },
#   {user_id: 5, first_name: FactoryHelper::Name.female_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   },
#   {user_id: 6, first_name: FactoryHelper::Name.female_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   },
#   {user_id: 7, first_name: Faker::Name.first_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   },
#   {user_id: 8, first_name: Faker::Name.first_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   },
#   {user_id: 9, first_name: Faker::Name.first_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   },
#   {user_id: 10, first_name: Faker::Name.first_name,
#     last_name: Faker::Name.last_name,
#     birthday: Faker::Date.between(50.year.ago, 13.year.ago),
#     gender: genders[my_rand.rand(0..2)]
#   }
# ])
