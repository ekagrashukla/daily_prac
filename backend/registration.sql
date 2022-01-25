DROP FUNCTION test_register_user(varchar,varchar,varchar,varchar)
CREATE FUNCTION test_register_user(_username VARCHAR, 
								   _password VARCHAR,
								  _firstname VARCHAR,
								  _lastname VARCHAR)
  RETURNS void AS
  $BODY$
      BEGIN
        INSERT INTO test_user_registration(username, password, firstname, lastname)
        VALUES(_username, _password, _firstname, _lastname);
      END;
  $BODY$
  LANGUAGE 'plpgsql'
  
 
 select * from test_user_registration;