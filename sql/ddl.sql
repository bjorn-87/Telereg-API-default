USE [Teleregistret]
GO

-- Drop tables
DROP VIEW IF EXISTS Connections
GO
DROP TABLE IF EXISTS Telereg
GO
DROP TABLE IF EXISTS Teletr
GO

/****** Object:  Table [dbo].[Telereg]    Script Date: 2021-03-04 09:04:58 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Telereg](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Number] [varchar](50) NOT NULL,
	[Name] [varchar](50) NULL,
	[Func] [varchar](50) NULL,
	[Address] [varchar](50) NULL,
	[Drawing] [varchar](50) NULL,
	[Apptype] [varchar](50) NULL,
	[Document] [varchar](50) NULL,
	[UserId] [varchar](50) NULL,
	[ApptypeTwo] [varchar](50) NULL,
	[UserFullName] [varchar](50) NULL,
	[Contact] [varchar](50) NULL,
	[Other] [varchar](100) NULL,
	[Created] [datetime] DEFAULT getDate(),
	[Updated] [datetime] NULL,
	[Deleted] [datetime] NULL,
 CONSTRAINT [PK__Telereg__] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

/****** Object:  Table [dbo].[Teletr]    Script Date: 2021-03-04 09:06:14 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Teletr](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[TeleregNumber] [varchar](50) NOT NULL,
	[Position] [int] NOT NULL,
	[Note] [varchar](50) NULL,
	[Rack] [varchar](50) NULL,
	[FieldFrom] [varchar](50) NULL,
	[NrFrom] [varchar](50) NULL,
	[KlFrom] [varchar](50) NULL,
	[FieldTo] [varchar](50) NULL,
	[NrTo] [varchar](50) NULL,
	[KlTo] [varchar](50) NULL,
	[Comment] [varchar](100) NULL,
	[Created] [datetime] DEFAULT getDate(),
	[Updated] [datetime] NULL,
	[Deleted] [datetime] NULL,
 CONSTRAINT [PK_teletr] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO






SET ANSI_PADDING ON
GO



-- Giving permission to user

GRANT ALTER ON [dbo].[Teletr] TO [test]
GO
GRANT CONTROL ON [dbo].[Teletr] TO [test]
GO
GRANT DELETE ON [dbo].[Teletr] TO [test]
GO
GRANT INSERT ON [dbo].[Teletr] TO [test]
GO
GRANT SELECT ON [dbo].[Teletr] TO [test]
GO
GRANT UPDATE ON [dbo].[Teletr] TO [test]
GO
GRANT ALTER ON [dbo].[Telereg] TO [test]
GO
GRANT CONTROL ON [dbo].[Telereg] TO [test]
GO
GRANT DELETE ON [dbo].[Telereg] TO [test]
GO
GRANT INSERT ON [dbo].[Telereg] TO [test]
GO
GRANT SELECT ON [dbo].[Telereg] TO [test]
GO
GRANT UPDATE ON [dbo].[Telereg] TO [test]
GO




--
-- Creating indexes for Table Telereg
--


/****** Object:  Index [IX_Telereg_Number]    Script Date: 2021-03-04 08:57:10 ******/
CREATE NONCLUSTERED INDEX [IX_Telereg_Number] ON [dbo].[Telereg]
(
	[Number] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_Telereg_Name]    Script Date: 2021-03-10 15:31:33 ******/
CREATE NONCLUSTERED INDEX [IX_Telereg_Name] ON [dbo].[Telereg]
(
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_Telereg_Address]    Script Date: 2021-03-10 15:43:20 ******/
CREATE NONCLUSTERED INDEX [IX_Telereg_Address] ON [dbo].[Telereg]
(
	[Address] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_Telereg_Deleted]    Script Date: 2021-03-10 15:48:41 ******/
CREATE NONCLUSTERED INDEX [IX_Telereg_Deleted] ON [dbo].[Telereg]
(
	[Deleted] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO


--
-- Creating indexes for Table Teletr
--

/****** Object:  Index [IX_Teletr_Rack]    Script Date: 2021-03-10 16:34:30 ******/
CREATE NONCLUSTERED INDEX [IX_Teletr_Rack] ON [dbo].[Teletr]
(
	[Rack] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_Teletr_Deleted]    Script Date: 2021-03-10 15:53:07 ******/
CREATE NONCLUSTERED INDEX [IX_Teletr_Deleted] ON [dbo].[Teletr]
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_Teletr_FieldFrom]    Script Date: 2021-03-10 15:53:07 ******/
CREATE NONCLUSTERED INDEX [IX_Teletr_FieldFrom] ON [dbo].[Teletr]
(
	[FieldFrom] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

/****** Object:  Index [IX_Teletr_FieldTo]    Script Date: 2021-03-10 15:53:07 ******/
CREATE NONCLUSTERED INDEX [IX_Teletr_FieldTo] ON [dbo].[Teletr]
(
	[FieldTo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO


/****** Object:  Index [IX_Teletr_TeleregNumber]    Script Date: 2021-03-10 15:53:07 ******/
CREATE NONCLUSTERED INDEX [IX_Teletr_TeleregNumber] ON [dbo].[Teletr]
(
	[TeleregNumber] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO

--
-- View to show existing connections based on rack and field
--
CREATE VIEW dbo.[Connections] AS
(
	SELECT 
		Rack,
		Fieldfrom AS Field,
		NrFrom AS Nr,
		KlFrom AS Kl,
		t.TeleregNumber AS Number,
		tr.Name,
		tr.Address,
		t.Comment
	FROM Teletr AS t
		JOIN Telereg AS tr 
			ON tr.Number = t.TeleregNumber
	WHERE t.Deleted IS NULL
)
UNION
(
	SELECT 
		t.Rack,
		t.FieldTo,
		t.NrTo,
		t.KlTo,
		t.TeleregNumber,
		tr.Name,
		tr.Address,
		t.Comment
	FROM Teletr AS t
		JOIN Telereg AS tr 
			ON tr.Number = t.TeleregNumber
	WHERE t.Deleted IS NULL
)
GO

-- Grant control to user 'test'
GRANT ALTER ON [dbo].[Connections] TO [test]
GO
GRANT CONTROL ON [dbo].[Connections] TO [test]
GO
GRANT DELETE ON [dbo].[Connections] TO [test]
GO
GRANT INSERT ON [dbo].[Connections] TO [test]
GO
GRANT SELECT ON [dbo].[Connections] TO [test]
GO
GRANT UPDATE ON [dbo].[Connections] TO [test]
GO