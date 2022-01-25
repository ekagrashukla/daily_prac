DROP FUNCTION test_get_user_info(varchar)
CREATE FUNCTION test_get_user_info(_username VARCHAR)
  RETURNS TABLE(firstname VARCHAR) AS
  $BODY$
      BEGIN
	  RETURN QUERY
        select u.firstname from test_user_registration u where u.username = _username;
      END;
  $BODY$
  LANGUAGE 'plpgsql'