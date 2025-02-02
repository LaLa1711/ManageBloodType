USE [QLNhomMau]
GO
/****** Object:  Table [dbo].[tbDangKy]    Script Date: 11/13/2024 7:42:49 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbDangKy](
	[IDDangKy] [int] IDENTITY(1,1) NOT NULL,
	[TaiKhoan] [varchar](50) NULL,
	[MatKhau] [varchar](50) NULL,
	[IDQuyen] [int] NULL,
	[TenGD_DN] [nvarchar](510) NULL,
 CONSTRAINT [PK_tbDangKy] PRIMARY KEY CLUSTERED 
(
	[IDDangKy] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbDangNhap]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbDangNhap](
	[IDDangNhap] [int] IDENTITY(1,1) NOT NULL,
	[TaiKhoan] [varchar](50) NULL,
	[MatKhau] [varchar](50) NULL,
	[IDQuyen] [int] NULL,
	[Alias] [varchar](150) NULL,
 CONSTRAINT [PK_tbDangNhap] PRIMARY KEY CLUSTERED 
(
	[IDDangNhap] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbGrDK_TT]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbGrDK_TT](
	[IDGrDK_TT] [int] IDENTITY(1,1) NOT NULL,
	[IDDangKy] [int] NULL,
	[IDThongTin] [int] NULL,
 CONSTRAINT [PK_tbGrDK_TT] PRIMARY KEY CLUSTERED 
(
	[IDGrDK_TT] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbGrMau_DC]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbGrMau_DC](
	[IDGrMau_DC] [int] IDENTITY(1,1) NOT NULL,
	[IDNhomMau] [int] NULL,
	[IDPhuong] [int] NULL,
	[IDQuan] [int] NULL,
	[IDThanhPho] [int] NULL,
 CONSTRAINT [PK_tbGrMau_DC] PRIMARY KEY CLUSTERED 
(
	[IDGrMau_DC] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbNhomMau]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbNhomMau](
	[IDNhomMau] [int] IDENTITY(1,1) NOT NULL,
	[TenNhomMau] [varchar](10) NULL,
	[Hide] [bit] NULL,
 CONSTRAINT [PK_tbNhomMau] PRIMARY KEY CLUSTERED 
(
	[IDNhomMau] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbPhanQuyen]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbPhanQuyen](
	[IDQuyen] [int] IDENTITY(1,1) NOT NULL,
	[TenQuyen] [nvarchar](50) NULL,
 CONSTRAINT [PK_tbPhanQuyen] PRIMARY KEY CLUSTERED 
(
	[IDQuyen] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbPhuong]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbPhuong](
	[IDPhuong] [int] IDENTITY(1,1) NOT NULL,
	[TenPhuong] [nvarchar](150) NULL,
	[Hide] [bit] NULL,
 CONSTRAINT [PK_tbPhuong] PRIMARY KEY CLUSTERED 
(
	[IDPhuong] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbQuan]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbQuan](
	[IDQuan] [int] IDENTITY(1,1) NOT NULL,
	[TenQuan] [nvarchar](50) NULL,
	[Hide] [bit] NULL,
 CONSTRAINT [PK_tbQuan] PRIMARY KEY CLUSTERED 
(
	[IDQuan] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbThanhPho]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbThanhPho](
	[IDThanhPho] [int] IDENTITY(1,1) NOT NULL,
	[TenTP] [nvarchar](150) NULL,
	[Hide] [bit] NULL,
 CONSTRAINT [PK_tbThanhPho] PRIMARY KEY CLUSTERED 
(
	[IDThanhPho] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tbThongTin]    Script Date: 11/13/2024 7:42:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbThongTin](
	[IDThongTin] [int] IDENTITY(1,1) NOT NULL,
	[TenGD_DN] [nvarchar](150) NULL,
	[HoTen] [nvarchar](50) NULL,
	[SDT] [varchar](11) NULL,
	[Gmail] [varchar](150) NULL,
	[DiaChi] [nvarchar](150) NULL,
	[IDPhuong] [int] NULL,
	[IDQuan] [int] NULL,
	[IDThanhPho] [int] NULL,
	[NgaySinh] [date] NULL,
	[GioiTinh] [bit] NULL,
	[CCCD] [varchar](50) NULL,
	[NgayCap] [date] NULL,
	[NoiCap_IDTP] [int] NULL,
	[IDNhomMau] [int] NULL,
 CONSTRAINT [PK_tbThongTin] PRIMARY KEY CLUSTERED 
(
	[IDThongTin] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tbDangKy] ON 

INSERT [dbo].[tbDangKy] ([IDDangKy], [TaiKhoan], [MatKhau], [IDQuyen], [TenGD_DN]) VALUES (1, N'abc', N'abc', 3, N'abc')
INSERT [dbo].[tbDangKy] ([IDDangKy], [TaiKhoan], [MatKhau], [IDQuyen], [TenGD_DN]) VALUES (2, N'asd', N'asd', 3, N'abc_a')
SET IDENTITY_INSERT [dbo].[tbDangKy] OFF
GO
SET IDENTITY_INSERT [dbo].[tbDangNhap] ON 

INSERT [dbo].[tbDangNhap] ([IDDangNhap], [TaiKhoan], [MatKhau], [IDQuyen], [Alias]) VALUES (1, N'Admin', N'Admin', 1, NULL)
SET IDENTITY_INSERT [dbo].[tbDangNhap] OFF
GO
SET IDENTITY_INSERT [dbo].[tbPhanQuyen] ON 

INSERT [dbo].[tbPhanQuyen] ([IDQuyen], [TenQuyen]) VALUES (1, N'Admin')
INSERT [dbo].[tbPhanQuyen] ([IDQuyen], [TenQuyen]) VALUES (2, N'Cá Nhân')
INSERT [dbo].[tbPhanQuyen] ([IDQuyen], [TenQuyen]) VALUES (3, N'Doanh Nghiệp')
INSERT [dbo].[tbPhanQuyen] ([IDQuyen], [TenQuyen]) VALUES (4, N'Hộ Gia Đình')
SET IDENTITY_INSERT [dbo].[tbPhanQuyen] OFF
GO
