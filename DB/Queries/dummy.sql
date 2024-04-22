select * from users
INSERT INTO users (phone_number, full_name, mid, dob, country, kyc_status, pin, registration_date) 
VALUES ('+00000000000', 'test', 'nizar', '2000-01-01', '132', false, '4cc8f4d609b717356701c57a03e737e5ac8fe885da8c7163d3de47e01849c635', NOW());

select * from wallets
select * from user_group_memberships
select * from groups
select * from countries

update wallets set balance=1000

select * from user_ratings
insert into user_ratings(rated_user_id, rating_user_id, rating, comment, rating_date)
values (6, 5, 4, '', NOW())

select * from unmatched_requests
insert into unmatched_requests(user_id, amount, currency, destination_country_id, status, creation_date) values(5, 700, 'USD', 3, 'Cancelled', NOW())

select * from matched_requests
insert into matched_requests(user1_id, user2_id, amount, currency, user1_transfer_confirmed, user2_transfer_confirmed, user1_received_confirmed, user2_received_confirmed, status, creation_date, completion_date)
values(5, 6, 600, 'USD',false, false, false, false, 'Pending', NOW(), NULL)

select * from requests_history
insert into requests_history(unmatched_id, matched_id, user_id, date) values(3, null, 5, NOW())
update requests_history set unmatched_id = 3 where id = 4

select * from transactions
insert into transactions(initiator_user_id, partner_user_id, amount, currency, status, creation_date, completion_date, fee)
values(5, 6, 200, 'USD', 'Cancelled', NOW(), null, 2)

select * from transactions_history
insert into transactions_history(transaction_id, top_up_id, user_id) values(null, 1, 5)

select * from top_ups
insert into top_ups(user_id, amount, currency, time, source) values(5, 1200, 'USD', NOW(), 'CreditCard')

SELECT enumlabel
FROM pg_enum
WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'matching_status');
