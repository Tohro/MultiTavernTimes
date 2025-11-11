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
                    { new Guid("8F3FB989-5B35-4E12-8606-69F86F538BDF"),
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)),
                        "78e7796050ede9db208b5b2d88e7efa2.jpg",
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("435424C2-F51A-4C04-B606-5C99A125D369"),
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)),
                        "bfdghfgh.png",
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("C9164CDF-349C-4DAF-B6B9-9BA0BA5D14F6"),
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)),
                        "dasdwefsd.jpg",
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("EF860288-7C7C-4B3D-A9A8-38BB306F7148"),
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)),
                        "sadfewcv.png",
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("B0595356-BBDF-4DD3-BF84-27DBBE91AFAB"),
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)),
                        "27df19fd2807.png",
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("48292e75-73ec-4c29-b513-2b983bcae2c8"),
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)),
                        "FSzVo7X.jpeg", 
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)) },
                    { new Guid("7AB36F3F-920A-41DE-BDDF-C1C202AB6653"),
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)),
                        "c223386ed166a86b7014ba76ce5af381.png", 
                        new DateTimeOffset(new DateTime(2025, 11, 7, 13, 35, 17, 702, DateTimeKind.Unspecified).AddTicks(4062),
                            new TimeSpan(0, 0, 0, 0, 0)) }
                });

            migrationBuilder.InsertData(
                table: "news_translation",
                columns: new[] { "translation_id", "language", "news_id", "subtitle", "text", "title" },
                values: new object[,]
                {
                    { 
                        new Guid("214455be-d3b5-48f9-8c47-62a8055bddd6"),
                        "en",
                        new Guid("7AB36F3F-920A-41DE-BDDF-C1C202AB6653"),
                        "HR is stunned, DevOps is missing, and interviews now require silver circles and garlic",
                        "Yesterday, something bizarre happened at the tech company “Codeosaur.” A candidate arrived claiming to be “a mid-level dev with a junior’s soul.” He spoke confidently about Kubernetes, Terraform, and “spiritual alignment with CI/CD,” but when asked to open a terminal—he launched the calculator.\nIt was later revealed he wasn’t alone: it was a full pack—three friends, eight virtual machines, a hint chat, and a cat sitting on the keyboard. They passed the interview in train formation, left behind flawless code, and vanished into the cloud. HR now screens candidates with a silver mouse, and the team lead swears he heard howling in the background of Zoom.",
                        "Wolves in the Cloud: Juniors Disguised as Seniors Stole Jenkins" 
                    },
                    { 
                        new Guid("5d6fec38-4d50-4a19-aeb6-b6e8956f1425"),
                        "ru",
                        new Guid("7AB36F3F-920A-41DE-BDDF-C1C202AB6653"),
                        "HR в шоке, DevOps в бегах, а собеседования теперь проходят в серебряных кругах с чесноком.",
                        "Вчера в ИТ-компании «Кодозавр» произошло нечто странное: на собеседование пришёл кандидат, представившийся как «мидл с душой джуна». Он уверенно говорил о Kubernetes, Terraform и «духовной связи с CI/CD», но при попытке открыть терминал — запустил калькулятор.\nПозже выяснилось, что это был не один человек, а целая стая: трое друзей, восемь виртуалок, чат с подсказками и один кот, сидящий на клавиатуре. Они прошли собеседование «паровозиком», оставили после себя идеальный код и исчезли в облаке. HR теперь проверяет кандидатов серебряной мышкой, а тимлид клянётся, что слышал вой на фоне Zoom.",
                        "Волки в облаке: джуны прикинулись сеньорами и украли Jenkins" 
                    },
                    { 
                        new Guid("92D300B8-9C11-43FE-B6D6-91FAACD08B01"),
                        "en",
                        new Guid("48292e75-73ec-4c29-b513-2b983bcae2c8"),
                        "Freelancers demand Bitcoin, bugs are sold on marketplaces, and juniors charge for debugging.",
                        "According to the Developer Guild, the cost of creating an “OK” button has risen by 300%, especially if it’s round, has a shadow, and “radiates confidence.” One startup spent its entire budget implementing dark mode, while another paid consultants just to name a variable correctly.\nFreelance markets are even wilder: one frontend dev refuses to code without NFT payment, and a backend wizard from Mordor demands a boar sacrifice for each PostgreSQL integration. Some companies have switched to barter: bug for bug, feature for feature. Team leads now carry sacks of gold, and juniors walk around with price lists titled “Why It Doesn’t Work: Diagnostic Packages.”",
                        "Dev Costs Soar: Pull Requests Now Require Donations and a Boar Sacrifice" 
                    },
                    { 
                        new Guid("96FBCE12-9F2F-4099-94EC-EA46DBCC1691"),
                        "ru",
                        new Guid("48292e75-73ec-4c29-b513-2b983bcae2c8"),
                        "Фрилансеры требуют оплату в биткоинах, баги продаются на маркетплейсе, а джуны берут плату за дебаг.",
                        "По последним данным Гильдии Разработчиков, стоимость создания кнопки «ОК» выросла на 300%, особенно если она должна быть круглой, с тенью и «ощущением уверенности». Один стартап потратил весь бюджет на внедрение тёмной темы, а другой — на консультации по тому, как правильно назвать переменную.\nВ мире фриланса ситуация ещё драматичнее: один фронтендер отказался верстать без NFT-оплаты, а бэкендер из Мордора требует жертву кабана за каждую интеграцию с PostgreSQL. Некоторые компании перешли на бартер: баг за баг, фича за фичу. Тимлиды теперь ходят с мешками золота, а джуны — с прайс-листом на «проверку, почему не работает».",
                        "Разработка дорожает: теперь за pull request требуют донат и жертву кабана" 
                    },
                    { 
                        new Guid("DA566651-9154-49A4-BA50-86105C5F98E8"),
                        "en",
                        new Guid("B0595356-BBDF-4DD3-BF84-27DBBE91AFAB"),
                        "He simply sat down, said “I’m Insider” — and the internet explodedg.",
                        "On the IXBT Games YouTube channel, something happened that’s now being called “the interview nobody verified.” Blogger Maizenberg posed as an insider, interviewed himself, and confidently spoke about the inner workings of development. No one thought to ask who he was—his expression alone suggested he’d just optimized bugs using sheer willpower.\nAfter the video was published, chaos erupted: viewers argued, IXBT was baffled, and Maizenberg admitted it was a trust experiment. The results were astonishing—trust worked, and the fake insider became a meme. IXBT now conducts interviews with sarcasm detectors, and Maizenberg earned the honorary title: “I’m insider.”",
                        "Insider from Nowhere: Maizenberg Hijacks IXBT with a Single Interview" 
                    },
                    { 
                        new Guid("0D70E98D-031C-4568-B99B-B1A8C6BB06F0"),
                        "ru",
                        new Guid("B0595356-BBDF-4DD3-BF84-27DBBE91AFAB"),
                        "Он просто сел перед камерой, сказал «я Инсайдер» — и интернет взорвался.",
                        "На YouTube-канале IXBT Games произошло нечто, что теперь называют «интервью, которое никто не проверил». Блогер Майзенберг выдал себя за инсайдера, дал интервью самому себе, и уверенно рассказывал о внутренней жизни разработки. Никто не подумал уточнить, кто он такой — ведь говорил он с таким выражением лица, будто только что оптимизировал баги силой мысли.\nПосле публикации начался ор выше гор: зрители спорили, IXBT удивлялись, а сам Майзенберг признался, что это был эксперимент по проверке. Результаты ошеломляющие — доверие сработало, а фейковый инсайдер стал мемом. Теперь на IXBT собеседования проходят с детектором сарказма, а Майзенберг получил звание «я инсайдер».",
                        "Инсайдер из ниоткуда: Майзенберг взломал IXBT одним интервью" 
                    },
                    { 
                        new Guid("36B9A905-B053-4F82-9CBC-6ADE221D42A6"),
                        "en",
                        new Guid("EF860288-7C7C-4B3D-A9A8-38BB306F7148"),
                        "SpaceX calls it innovation, NASA asks to stop smoking in the stratosphere.",
                        "This morning, SpaceX successfully launched another Starship prototype, but eagle-eyed viewers noticed something odd: the rocket looked suspiciously like a giant cigar. Elon Musk later confirmed, “Yes, it’s a cigar. We just wanted to chill… in orbit.”\nAccording to engineers, the cigar-rocket was wrapped in heat-resistant tobacco leaves, and instead of fuel, it ran on inspiration and marketing. Inside was a single passenger — a plastic ashtray signed by Elon himself. NASA expressed concern, but Musk replied, “It’s not smoking, it’s aerosmoking.”",
                        "Elon Musk Launches Cigar into Space: Starship Wasn’t What It Seemed" 
                    },
                    { 
                        new Guid("451DE5E4-ED55-4F1F-A414-020902697E9A"),
                        "ru",
                        new Guid("EF860288-7C7C-4B3D-A9A8-38BB306F7148"),
                        "SpaceX заявляет об инновациях, а NASA просит не курить в стратосфере",
                        "Сегодня утром SpaceX успешно запустила очередной прототип Starship, но внимательные зрители заметили странность: ракета подозрительно напоминала гигантскую сигару. Позже Илон Маск подтвердил: «Да, это сигара. Мы просто хотели расслабиться… на орбите».\nПо словам инженеров, сигара-ракета была обёрнута в термостойкий табак, а вместо топлива использовалась смесь вдохновения и маркетинга. Внутри находился один пассажир — пластиковый пепельник с автографом Илона. В NASA выразили обеспокоенность, но Маск ответил: «Это не курение, это аэрокурение».",
                        "Илон Маск запустил сигару в космос: Starship оказался не тем, чем казался" 
                    },
                    {
                        new Guid("B5233CD5-D726-4BA7-95FF-BC5849C71850"),
                        "en",
                        new Guid("C9164CDF-349C-4DAF-B6B9-9BA0BA5D14F6"),
                        "JavaScript vs Python",
                        "In a surprise twist, JavaScript challenged Python to a duel over syntax supremacy. The battle took place in a virtual arena coded entirely in HTML5, with spectators cheering in JSON. Python arrived wearing a robe of indentation, while JavaScript dual-wielded semicolons. After three rounds of async banter and recursive taunts, both languages agreed to settle the score by launching a joint startup: SnakeScript.js.",
                        "JavaScript vs Python: The Syntax Showdown"
                    },
                    {
                        new Guid("406143A4-9DA3-4583-B318-C680ED34F6FA"),
                        "ru",
                        new Guid("C9164CDF-349C-4DAF-B6B9-9BA0BA5D14F6"),
                        "JavaScript vs Python",
                        "В неожиданном повороте событий JavaScript вызвал Python на дуэль за звание короля синтаксиса. Битва прошла в виртуальной арене, полностью написанной на HTML5, а зрители болели в формате JSON. Python пришёл в мантии из отступов, а JavaScript — с двумя точками с запятой. После трёх раундов асинхронных выпадов и рекурсивных насмешек языки решили открыть совместный стартап: SnakeScript.js.",
                        "JavaScript против Python: синтаксическая дуэль"
                    },
                    {
                        new Guid("A37524F5-8899-4D56-A009-503C100D55E0"),
                        "en",
                        new Guid("435424C2-F51A-4C04-B606-5C99A125D369"),
                        "HR's pain was audible in the room",
                        "In a shocking HR directive, a recruiter was tasked with finding an Assembly developer using Netscape Navigator. Armed with a floppy disk and a dial-up modem, the recruiter bravely entered forums last updated in 1998. After three pop-ups, two GIFs, and one MIDI soundtrack, they located a candidate who still codes in hex and communicates via ICQ.",
                        "HR Forced to Find Assembly Dev Using Netscape"
                    },
                    {
                        new Guid("238379C6-89C3-4ED9-BB38-63D7D52DDC94"),
                        "ru",
                        new Guid("435424C2-F51A-4C04-B606-5C99A125D369"),
                        "Боль HR было слышно в коморке",
                        "В HR-отдел поступило задание: найти разработчика на ассемблере через браузер Netscape Navigator. Вооружившись дискетой и модемом на 56k, рекрутер отправился в форумы, последний раз обновлённые в 1998 году. После трёх всплывающих окон, двух гифок и одного MIDI-звука был найден кандидат, который до сих пор пишет в hex и общается через ICQ.",
                        "HR ищет ассемблера через Netscape: корпоративный квест"
                    },
                    {
                        new Guid("68493702-F072-4C93-8B84-9008F0611681"),
                        "en",
                        new Guid("8F3FB989-5B35-4E12-8606-69F86F538BDF"),
                        "Remote work and gravity",
                        "After three years of remote work, employees now consider office chairs hostile terrain. One developer tried commuting and immediately filed a bug report against gravity.",
                        "Nobody Wants to Return to the Office: Remote Rebellion Begins"
                    },
                    {
                        new Guid("F8D4B834-BFD9-4B2B-BC47-E6BECDA8914B"),
                        "ru",
                        new Guid("8F3FB989-5B35-4E12-8606-69F86F538BDF"),
                        "Удаленная работа и гравитация",
                        "После трёх лет удалёнки офисные кресла воспринимаются как враждебная среда. Один разработчик попробовал доехать и сразу завёл баг на гравитацию.",
                        "Никто не хочет возвращаться в офис: начинается удалённый бунт"
                    }
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
