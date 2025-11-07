using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace MTT.Storage.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "news",
                columns: table => new
                {
                    news_id = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    ModifiedAt = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    image_file_name = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_news", x => x.news_id);
                });

            migrationBuilder.CreateTable(
                name: "news_translation",
                columns: table => new
                {
                    translation_id = table.Column<Guid>(type: "uuid", nullable: false),
                    news_id = table.Column<Guid>(type: "uuid", nullable: false),
                    language = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false),
                    title = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    subtitle = table.Column<string>(type: "character varying(250)", maxLength: 250, nullable: false),
                    text = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_news_translation", x => x.translation_id);
                    table.ForeignKey(
                        name: "FK_news_translation_news_news_id",
                        column: x => x.news_id,
                        principalTable: "news",
                        principalColumn: "news_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "news",
                columns: new[] { "news_id", "CreatedAt", "image_file_name", "ModifiedAt" },
                values: new object[,]
                {
                    { new Guid("03acc220-c687-46cf-b653-c87ec383943d"), new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062), new TimeSpan(0, 0, 0, 0, 0)), "dragon_attack.jpg", new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062), new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("48292e75-73ec-4c29-b513-2b983bcae2c8"), new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062), new TimeSpan(0, 0, 0, 0, 0)), "wizard_duel.png", new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062), new TimeSpan(0, 0, 0, 0, 0)) }
                });

            migrationBuilder.InsertData(
                table: "news_translation",
                columns: new[] { "translation_id", "language", "news_id", "subtitle", "text", "title" },
                values: new object[,]
                {
                    { new Guid("214455be-d3b5-48f9-8c47-62a8055bddd6"), "en", new Guid("03acc220-c687-46cf-b653-c87ec383943d"), "Chaos in the Northern Lands", "A wild dragon descended upon the village, causing panic and destruction.", "Dragon Attacks Village" },
                    { new Guid("5d6fec38-4d50-4a19-aeb6-b6e8956f1425"), "ru", new Guid("03acc220-c687-46cf-b653-c87ec383943d"), "Хаос на севере", "Дикий дракон обрушился на деревню, вызвав панику и разрушения.", "Дракон атакует деревню" },
                    { new Guid("9240d82f-83c2-4e0b-9ef5-d15f7b2b89e1"), "en", new Guid("48292e75-73ec-4c29-b513-2b983bcae2c8"), "Magic Unleashed", "Two archmages clashed in the heart of the capital, unleashing powerful spells.", "Wizard Duel Shakes the Capital" },
                    { new Guid("e406c0b4-e8fc-4368-b6b5-f5ff355fd882"), "ru", new Guid("48292e75-73ec-4c29-b513-2b983bcae2c8"), "Магия без границ", "Два архимага столкнулись в центре столицы, выпуская мощные заклинания.", "Поединок магов потряс столицу" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_news_translation_unique_language_per_news",
                table: "news_translation",
                columns: new[] { "news_id", "language" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "news_translation");

            migrationBuilder.DropTable(
                name: "news");
        }
    }
}
