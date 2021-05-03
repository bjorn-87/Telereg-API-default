--
-- Diffrent queries for testing.
--

USE [LKTelereg]
GO

INSERT INTO Telereg (Number, Name, Func, Address, Drawing, Apptype, Document, UserId, ApptypeTwo, UserFullName, Other) 
	VALUES 
		('122/0037', 'Test linje', 'Telefonlinje', 'Manskapshuset', NULL, 'Doro', NULL, 'MLJODO', NULL, 'John Doe', 'Test linje kopplad till manskapshuset')
GO

INSERT INTO Telereg (Number, Name, Func, Address, Drawing, Apptype, Document, UserId, ApptypeTwo, UserFullName, Other) 
	VALUES 
		('122/0038', 'Test linje 2', 'Fiberlinje', 'Manskapshuset', NULL, 'Doro', NULL, 'MLJADO', NULL, 'Jane Doe', 'Test linje kopplad till manskapshuset')
GO

INSERT INTO Telereg (Number) VALUES ('122/0036')
GO

INSERT INTO Teletr
	(TeleregNumber, Position, Note, Rack, FieldFrom, NrFrom, KlFrom, FieldTo, NrTo, KlTo, Comment, Created)
	VALUES
	('122/0036', 1, 'Modem', 'AM', '01', '02A', '05A/05B', '05', '21C', '10A/10B', 'Modem till telefon', getdate())
GO

INSERT INTO Teletr
	(TeleregNumber, Position, Note, Rack, FieldFrom, NrFrom, KlFrom, FieldTo, NrTo, KlTo, Comment, Created)
	VALUES
	('122/0037', 1, 'Modem', 'BM', '01', '02A', '05A/05B', '05', '21C', '10A/10B', 'Modem till telefon', getdate())
GO

INSERT INTO Teletr
	(TeleregNumber, Position, Note, Rack, FieldFrom, NrFrom, KlFrom, FieldTo, NrTo, KlTo, Comment, Created)
	VALUES
	('122/0037', 2, 'Modem', 'AM', '01', '02A', '05A/05B', '05', '21C', '10A/10B', 'Modem till telefon', getdate())
GO

DECLARE @counter INT
SET @counter=1
WHILE ( @counter <= 1000 )
BEGIN
	INSERT INTO Telereg (Number) VALUES (@counter)
	SET @counter = @counter + 1
END

SELECT * FROM Telereg order by Number ASC
GO

SELECT * FROM Teletr
GO