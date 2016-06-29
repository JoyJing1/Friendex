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
User.create!(email: "test2", password: "testtest", username: "Sheryl Sandberg")
User.create!(email: "test3", password: "testtest", username: "Mark Andreessen")
User.create!(email: "test4", password: "testtest", username: "Sundar Pichai")
User.create!(email: "test5", password: "testtest", username: "Larry Page")
User.create!(email: "test6", password: "testtest", username: "Sergey Brin")
User.create!(email: "test7", password: "testtest", username: "Jan Koum")
User.create!(email: "test8", password: "testtest", username: "Jeff Weiner")

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
    workplace: "Facebook")

Profile.create!(user_id: 2,
    first_name: "Sheryl",
    last_name: "Sandberg",
    birthday: "1969-08-28",
    gender: "female",
    workplace: "Facebook")

Profile.create!(user_id: 3,
    first_name: "Marc",
    last_name: "Andreessen",
    birthday: "1971-07-09",
    gender: "male",
    workplace: "Facebook")

# Google
Profile.create!(user_id: 4,
    first_name: "Sundar",
    last_name: "Pichai",
    birthday: "1972-07-12",
    gender: "male",
    workplace: "Google")

Profile.create!(user_id: 5,
    first_name: "Larry",
    last_name: "Page",
    birthday: "1973-03-26",
    gender: "male",
    workplace: "Google")

Profile.create!(user_id: 6,
    first_name: "Sergey",
    last_name: "Brin",
    birthday: "1973-08-21",
    gender: "male",
    workplace: "Google")

# Whatsapp
Profile.create!(user_id: 7,
    first_name: "Jan",
    last_name: "Koum",
    birthday: "1976-02-24",
    gender: "male",
    workplace: "Whatsapp")

Profile.create!(user_id: 8,
    first_name: "Jeff",
    last_name: "Weiner",
    birthday: "1970-02-21",
    gender: "male",
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
