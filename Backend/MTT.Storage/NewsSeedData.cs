namespace MTT.Storage;

public static class NewsSeedData
{
    public static List<Entities.News> GetNews()
    {
        var now = DateTimeOffset.UtcNow;

        return new List<Entities.News>
        {
            new Entities.News
            {
                NewsId = Guid.NewGuid(),
                CreatedAt = now,
                ModifiedAt = now,
                ImageFileName = "dragon_attack.jpg",
                Translations = new List<Entities.NewsTranslation>
                {
                    new()
                    {
                        TranslationId = Guid.NewGuid(),
                        Language = "en",
                        Title = "Dragon Attacks Village",
                        Subtitle = "Chaos in the Northern Lands",
                        Text = "A wild dragon descended upon the village, causing panic and destruction.",
                    },
                    new()
                    {
                        TranslationId = Guid.NewGuid(),
                        Language = "ru",
                        Title = "Дракон атакует деревню",
                        Subtitle = "Хаос на севере",
                        Text = "Дикий дракон обрушился на деревню, вызвав панику и разрушения.",
                    }
                }
            },
            new Entities.News
            {
                NewsId = Guid.NewGuid(),
                CreatedAt = now,
                ModifiedAt = now,
                ImageFileName = "wizard_duel.png",
                Translations = new List<Entities.NewsTranslation>
                {
                    new()
                    {
                        TranslationId = Guid.NewGuid(),
                        Language = "en",
                        Title = "Wizard Duel Shakes the Capital",
                        Subtitle = "Magic Unleashed",
                        Text = "Two archmages clashed in the heart of the capital, unleashing powerful spells.",
                    },
                    new()
                    {
                        TranslationId = Guid.NewGuid(),
                        Language = "ru",
                        Title = "Поединок магов потряс столицу",
                        Subtitle = "Магия без границ",
                        Text = "Два архимага столкнулись в центре столицы, выпуская мощные заклинания.",
                    }
                }
            }
        };
    }
}
