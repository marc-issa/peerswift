-- Enum types
CREATE TYPE card_status AS ENUM ('Active', 'Hold', 'Expired');
CREATE TYPE transaction_status AS ENUM ('Pending', 'Completed', 'Cancelled');
CREATE TYPE transaction_type AS ENUM ('Deposit', 'Transfer', 'Withdrawal');
CREATE TYPE action_type AS ENUM ('Initiated', 'Completed', 'Cancelled');
CREATE TYPE money_transfer_status AS ENUM ('Pending', 'Matched', 'Cancelled');
CREATE TYPE request_event_type AS ENUM ('Created', 'Updated', 'Matched', 'Cancelled');
CREATE TYPE source_type AS ENUM ('CreditCard', 'BankTransfer', 'CashDeposit');
CREATE TYPE hold_status AS ENUM ('Active', 'Released', 'Cancelled');

-- countries table
CREATE TABLE countries (
  country_id SERIAL PRIMARY KEY,
  country_code varchar(255),
  country_name varchar(255),
  country_abreviation varchar(255),
  currency_name varchar(255),
  currency_code varchar(255),
  country_flag varchar(865)
);


-- users table
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  phone_number varchar(15) UNIQUE,
  full_name varchar(255),
  mid varchar(255),
  dob date,
  country_id int REFERENCES countries(country_id),
  kyc_status boolean,
  pin varchar(255),
  registration_date timestamp,
  last_login_date timestamp
);

-- credit_cards table
CREATE TABLE credit_cards (
  card_id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(user_id),
  card_number varchar(19),
  expiry_date date,
  cvv varchar(4),
  card_holder_name varchar(255),
  billing_address varchar(255),
  card_status card_status
);

-- transactions table
CREATE TABLE transactions (
  transaction_id SERIAL PRIMARY KEY,
  initiator_user_id int REFERENCES users(user_id),
  partner_user_id int REFERENCES users(user_id),
  amount decimal(10, 2),
  currency varchar(3),
  status transaction_status,
  creation_date timestamp,
  completion_date timestamp,
  transaction_type transaction_type,
  transaction_fee decimal(10, 2)
);

-- transaction_histories table
CREATE TABLE transaction_histories (
  history_id SERIAL PRIMARY KEY,
  transaction_id int REFERENCES transactions(transaction_id),
  user_id int REFERENCES users(user_id),
  action_type action_type,
  timestamp timestamp
);

-- notifications table
CREATE TABLE notifications (
  notification_id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(user_id),
  notification_type varchar(50),
  message text,
  timestamp timestamp,
  is_read boolean
);

-- money_transfer_requests table
CREATE TABLE money_transfer_requests (
  request_id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(user_id),
  amount decimal(10, 2),
  currency varchar(3),
  destination_country varchar(100),
  status money_transfer_status,
  creation_date timestamp,
  expiry_date timestamp
);

-- matched_transfers table
CREATE TABLE matched_transfers (
  match_id SERIAL PRIMARY KEY,
  user1_id int REFERENCES users(user_id),
  user2_id int REFERENCES users(user_id),
  initiator_amount decimal(10, 2),
  partner_amount decimal(10, 2),
  currency varchar(3),
  deadline timestamp,
  user1_transfer_confirmed boolean,
  user2_transfer_confirmed boolean,
  user1_received_confirmed boolean,
  user2_received_confirmed boolean,
  status money_transfer_status,
  creation_date timestamp,
  completion_date timestamp
);

-- request_histories table
CREATE TABLE request_histories (
  history_id SERIAL PRIMARY KEY,
  request_id int REFERENCES money_transfer_requests(request_id),
  matched_id int REFERENCES matched_transfers(match_id),
  user_id int REFERENCES users(user_id),
  event_type request_event_type,
  amount decimal(10, 2),
  currency varchar(3),
  status money_transfer_status,
  timestamp timestamp,
  description text
);

-- wallets table
CREATE TABLE wallets (
  wallet_id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(user_id),
  balance decimal(10, 2),
  currency varchar(3)
);

-- groups table
CREATE TABLE groups (
  group_id SERIAL PRIMARY KEY,
  group_name varchar(255),
  country_id int REFERENCES countries(country_id),
  description text
);

-- user_group_memberships table
CREATE TABLE user_group_memberships (
  membership_id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(user_id),
  group_id int REFERENCES groups(group_id),
  join_date timestamp
);

-- group_messages table
CREATE TABLE group_messages (
  message_id SERIAL PRIMARY KEY,
  group_id int REFERENCES groups(group_id),
  user_id int REFERENCES users(user_id),
  message_text text,
  timestamp timestamp
);

-- user_contacts table
CREATE TABLE user_contacts (
  contact_id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(user_id),
  contact_user_id int REFERENCES users(user_id),
  added_date timestamp
);

-- login_sessions table
CREATE TABLE login_sessions (
  session_id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(user_id),
  login_time timestamp,
  logout_time timestamp,
  ip_address varchar(45),
  device_info text
);

-- top_ups table
CREATE TABLE top_ups (
  top_up_id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(user_id),
  amount decimal(10, 2),
  currency varchar(3),
  top_up_time timestamp,
  source source_type,
  source_details text
);

-- credit_card_holds table
CREATE TABLE credit_card_holds (
  hold_id SERIAL PRIMARY KEY,
  card_id int REFERENCES credit_cards(card_id),
  user_id int REFERENCES users(user_id),
  amount decimal(10,2),
  currency varchar(3),
  hold_placed_time timestamp,
  hold_released_time timestamp,
  status hold_status
);

-- user_ratings table
CREATE TABLE user_ratings (
  rating_id SERIAL PRIMARY KEY,
  rated_user_id int REFERENCES users(user_id), -- The user who is being rated
  rating_user_id int REFERENCES users(user_id), -- The user who is giving the rating
  rating decimal(2, 1), -- Ratings can be from 0.0 to 5.0, with one decimal place for precision
  comment text, -- Optional comment provided by the rating user
  rating_date timestamp -- The date and time when the rating was given
);

