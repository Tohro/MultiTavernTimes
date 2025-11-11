using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MTT.API.Models;
using MTT.Domain.UseCases;
using MTT.Domain.UseCases.NewsOperations.CreateNews;
using MTT.Domain.UseCases.NewsOperations.DeleteNews;
using MTT.Domain.UseCases.NewsOperations.GetNews;
using MTT.Domain.UseCases.NewsOperations.UpdateNews;

namespace MTT.API.Controllers;

[Authorize]
[ApiController]
[Route("api/news")]
public class NewsController(IMediator mediator, IWebHostEnvironment env) : ControllerBase
{
    [AllowAnonymous]
    [HttpPost("admin/login")]
    public async Task<IActionResult> Login([FromBody] LoginHashDto dto)
    {
        if (dto.EmailHash != AdminCredentials.EmailHash || dto.PasswordHash != AdminCredentials.PasswordHash)
            return Unauthorized("Неверные данные");

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, "Admin"),
            new Claim(ClaimTypes.Role, "Administrator")
        };

        var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
        var principal = new ClaimsPrincipal(identity);

        await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, principal);

        return Ok();
    }
    [HttpPost("logout")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> Logout()
    {
        await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
        return Ok(new { message = "Logged out" });
    }
    [Authorize]
    [HttpGet("check")]
    public IActionResult CheckAuth()
    {
        var role = User.IsInRole("Administrator") ? "Administrator" : "User";
        return Ok(new { isAuthenticated = true, role });
    }

    
    [HttpPost("create")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> CreateNews([FromBody] CreateNews request, CancellationToken token)
    {
        var command = new CreateNewsCommand(
            request.ImageFileName,
            request.Language,
            request.Title,
            request.Subtitle,
            request.Text);

        var response = await mediator.Send(command, token);
        return TransformData(response);
    }


    [HttpPut("update")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> UpdateNews([FromBody] UpdateNews request, CancellationToken token)
    {
        var command = new UpdateNewsCommand(
            request.NewsId,
            request.ImageFileName,
            request.Language,
            request.Title,
            request.Subtitle,
            request.Text);

        var response = await mediator.Send(command, token);
        return TransformData(response);
    }


    [HttpDelete("{newsId:guid}")]
    [Authorize(Roles = "Administrator")]
    public async Task<IActionResult> DeleteNews(Guid newsId, CancellationToken token)
    {
        var command = new DeleteNewsCommand(newsId);
        var response = await mediator.Send(command, token);
        
        return TransformData(response);
    }



    [AllowAnonymous]
    [HttpGet("{newsId:guid}/{language}")]
    public async Task<IActionResult> GetNewsById(Guid newsId, string language, CancellationToken token)
    {
        var query = new GetNewsByIdQuery(newsId, language);
        var response = await mediator.Send(query, token);
        return TransformData(response);
    }

    [AllowAnonymous]
    [HttpGet("list")]
    public async Task<IActionResult> GetNewsList([FromQuery] string language, [FromQuery] int skip,
    [FromQuery] int take, CancellationToken token)
    {
        var query = new GetNewsListQuery(language, skip, take);
        var response = await mediator.Send(query, token);
        var res= Result<(IEnumerable<News>,int)>
            .Ok((response.Value.Item1.Select(entity=>
            new News(
                entity.NewsId,
                entity.ImageFileName,
                entity.Language,
                entity.Title,
                entity.Subtitle,
                entity.Text,
                entity.CreatedAt,
                entity.ModifiedAt
            )),response.Value.totalCount));
        return new ObjectResult(res);
    }

    // Helper
    [Authorize(Roles = "Administrator")]
    [HttpPost("upload")]
    public async Task<IActionResult> UploadImage(IFormFile image)
    {
        if (image == null || image.Length == 0)
            return BadRequest("Файл не выбран.");

        var imagesPath = Path.Combine(env.WebRootPath, "news", "images");
        Directory.CreateDirectory(imagesPath); 

        var fileName = Path.GetRandomFileName() + Path.GetExtension(image.FileName);
        var filePath = Path.Combine(imagesPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await image.CopyToAsync(stream);
        }

        return Ok(new { fileName });
    }

    private IActionResult TransformData(Result<Guid> response)
    {
        if (!response.Success)
            return new ObjectResult(response);
        return new ObjectResult(Result<Guid>.Ok(response.Value));
    }
    private IActionResult TransformData(Result<Domain.Model.News> result)
    {
        if (!result.Success)
            return new ObjectResult(result);

        var mapped = new News(
            result.Value.NewsId,
            result.Value.ImageFileName,
            result.Value.Language,
            result.Value.Title,
            result.Value.Subtitle,
            result.Value.Text,
            result.Value.CreatedAt,
            result.Value.ModifiedAt
        );

        return new ObjectResult(Result<News>.Ok(mapped));
    }
    private IActionResult TransformData(Result<IEnumerable<Domain.Model.News>> result)
    {
        if (!result.Success)
            return new ObjectResult(result);

        var mappedList = result.Value.Select(x => new News(
            x.NewsId,
            x.ImageFileName,
            x.Language,
            x.Title,
            x.Subtitle,
            x.Text,
            x.CreatedAt,
            x.ModifiedAt
        ));

        return new ObjectResult(Result<IEnumerable<News>>.Ok(mappedList));
    }
}