# Schema Information
All tables will include created_at and updated_at timestamps.

## profiles
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, foreign key (references users), indexed
first_name      | string    | not null
last_name       | string    | not null
email           | string    | not null, indexed, unique
birthday        | date      | not null
gender          | string    | not null, default: other
profile_img     | string    |
background_img  | string    |
workplace       | string    |
school          | string    |
current_city    | string    |
hometown        | string    |
relationship    | string    |

## friendrequests
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
friender_id     | integer   | not null, foreign key (references users), indexed
friendee_id     | integer   | not null, foreign key (references users), indexed
date_sent       | date      | not null, indexed
responded       | boolean   | not null
accepted        | boolean   |

## friendships
column name       | data type | details
------------------|-----------|-----------------------
id                | integer   | not null, primary key
friendrequest_id  |  integer  | not null, foreign key (references friendrequests), indexed
friender_id       | integer   | not null, foreign key (references users), indexed
friendee_id       | integer   | not null, foreign key (references users), indexed
friendiversary    | date      | not null, indexed

## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
receiver_id | integer   | not null, foreign key (references users), indexed
body        | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique

## ads
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
title           | string    | not null, indexed, unique
description     | string    | not null
image           | string    | not null, indexed, unique



## BONUS

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
post_id     | string    | not null, foreign key (references posts), indexed
date        | datetime  | not null
type        | string    | not null
prev_id     | integer   | foreign key (references reminders), indexed

## post_likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
post_id     | integer   | not null, foreign key (references posts), indexed

## comment_likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
comment_id  | integer   | not null, foreign key (references comments), indexed

## messages
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
receiver_id | integer   | not null, foreign key (references users), indexed
