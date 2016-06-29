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

User.create!(email: "test", password: "testtest", username: "Mark Zuckerberg")
User.create!(email: "sheryl@facebook.com", password: "testtest", username: "Sheryl Sandberg")
User.create!(email: "marc@facebook.com", password: "testtest", username: "Mark Andreessen")
User.create!(email: "sundar@gmail.com", password: "testtest", username: "Sundar Pichai")
User.create!(email: "larry@gmail.com", password: "testtest", username: "Larry Page")
User.create!(email: "sergey@gmail.com", password: "testtest", username: "Sergey Brin")
User.create!(email: "jan@whatsapp.com", password: "testtest", username: "Jan Koum")
User.create!(email: "jeff@linkedin.com", password: "testtest", username: "Jeff Weiner")

# (9..29).each |_| do
#   User.create(email: Faker::Internet.email, password: "password")
# end

# Facebook
Profile.create!(user_id: 1,
    first_name: "Mark",
    last_name: "Zuckerberg",
    birthday: "1984-05-14",
    gender: "male",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155555/profiles/mark_zucker_profile.jpg",
    background_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155572/backgrounds/mark_zucker_background.jpg",
    workplace: "Facebook",
    current_city: "Menlo Park, CA")

Profile.create!(user_id: 2,
    first_name: "Sheryl",
    last_name: "Sandberg",
    birthday: "1969-08-28",
    gender: "female",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/c_crop,h_350,w_350/v1467198451/profiles/sheryl-sandberg-hed-2014.jpg",
    background_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155771/backgrounds/photo-1439123068749-20f4035bd7ed.jpg",
    workplace: "Facebook",
    current_city: "Menlo Park, CA",
    hometown: "Washington D.C.")

Profile.create!(user_id: 3,
    first_name: "Marc",
    last_name: "Andreessen",
    birthday: "1971-07-09",
    gender: "male",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/c_crop,h_600,w_600/v1467157354/profiles/150518_r26512-1200-630-06150519.jpg",
    background_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155783/backgrounds/photo-1463003416389-296a1ad37ca0.jpg",
    current_city: "Menlo Park, CA"
    workplace: "Facebook")

# Google
Profile.create!(user_id: 4,
    first_name: "Sundar",
    last_name: "Pichai",
    birthday: "1972-07-12",
    gender: "male",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/c_crop,h_300,w_300,x_80/v1467156929/profiles/SundarPichai129-_2.jpg",
    background_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155788/backgrounds/photo-1461770354136-8f58567b617a.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

Profile.create!(user_id: 5,
    first_name: "Larry",
    last_name: "Page",
    birthday: "1973-03-26",
    gender: "male",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/c_crop,h_675,w_675,x_350/v1467157122/profiles/LarryPage1.jpg",
    background_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155737/backgrounds/photo-1464621922360-27f3bf0eca75.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

Profile.create!(user_id: 6,
    first_name: "Sergey",
    last_name: "Brin",
    birthday: "1973-08-21",
    gender: "male",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/c_crop,h_400,w_400/v1467157152/profiles/Sergey-Brin.jpg",
    background_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155760/backgrounds/photo-1464400694175-33544b41703d.jpg",
    current_city: "Mountain View, CA",
    workplace: "Google")

# Whatsapp
Profile.create!(user_id: 7,
    first_name: "Jan",
    last_name: "Koum",
    birthday: "1976-02-24",
    gender: "male",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/c_crop,h_360,w_360/v1467198808/profiles/jan-koum-whatsapp.jpg",
    background_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155729/backgrounds/photo-1465205568425-23fdd3805e49.jpg",
    hometown: "Fastiv, Ukraine"
    workplace: "Whatsapp")

Profile.create!(user_id: 8,
    first_name: "Jeff",
    last_name: "Weiner",
    birthday: "1970-02-21",
    gender: "male",
    profile_img: "http://res.cloudinary.com/joyjing1/image/upload/c_crop,h_1124,w_1124,x_50/v1467198942/profiles/linkedin-ceo-jeff-weiner-explains-how-fixing-a-common-mistake-helped-him-grow-as-a-leader.jpg",
    background_img: "http://res.cloudinary.com/joyjing1/image/upload/v1467155771/backgrounds/photo-1431057499046-ecd6e0f36ebe.jpg",
    current_city: "New York City, NY"
    workplace: "LinkedIn")

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
