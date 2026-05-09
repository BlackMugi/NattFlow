using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NAttFlow.Migrations
{
    /// <inheritdoc />
    public partial class AddCotisationNotificationPaiement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Cotisations",
                columns: table => new
                {
                    IdCotisation = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Montant = table.Column<int>(type: "int", nullable: false),
                    Libelle = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Mois = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateEcheance = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cotisations", x => x.IdCotisation);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    IdNotification = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Titre = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Message = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lu = table.Column<bool>(type: "bit", nullable: false),
                    DateCreation = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.IdNotification);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_IdUser",
                        column: x => x.IdUser,
                        principalTable: "Users",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Paiements",
                columns: table => new
                {
                    IdPaiement = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Montant = table.Column<int>(type: "int", nullable: false),
                    DatePaiement = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Method = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Statut = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdCotisation = table.Column<int>(type: "int", nullable: false),
                    IdUser = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paiements", x => x.IdPaiement);
                    table.ForeignKey(
                        name: "FK_Paiements_Cotisations_IdCotisation",
                        column: x => x.IdCotisation,
                        principalTable: "Cotisations",
                        principalColumn: "IdCotisation",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Paiements_Users_IdUser",
                        column: x => x.IdUser,
                        principalTable: "Users",
                        principalColumn: "IdUser",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_IdUser",
                table: "Notifications",
                column: "IdUser");

            migrationBuilder.CreateIndex(
                name: "IX_Paiements_IdCotisation",
                table: "Paiements",
                column: "IdCotisation");

            migrationBuilder.CreateIndex(
                name: "IX_Paiements_IdUser",
                table: "Paiements",
                column: "IdUser");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Paiements");

            migrationBuilder.DropTable(
                name: "Cotisations");
        }
    }
}
