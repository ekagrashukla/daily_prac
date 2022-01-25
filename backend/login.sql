DROP FUNCTION test_login_user(varchar)
CREATE FUNCTION test_login_user(_username VARCHAR)
  RETURNS TABLE(password VARCHAR) AS
  $BODY$
      BEGIN
	  RETURN QUERY
        select tu.password from test_user_registration tu where tu.username = _username;
      END;
  $BODY$
  LANGUAGE 'plpgsql'
  
select * from test_login_user('ekagrashukla');