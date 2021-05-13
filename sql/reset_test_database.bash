server="localhost"
insert="sql/insert.sql"
setup="sql/setup.sql"
ddl="sql/ddl.sql"

echo "setup the database"
sqlcmd -S $server -i $setup -o sql/setup_output.txt
echo "creating tables"
sqlcmd -S $server -i $ddl -o sql/ddl_output.txt
echo "inserting into tables"
sqlcmd -S $server -i $insert -o sql/insert_output.txt