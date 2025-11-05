namespace MTT.Domain.UseCases;

public class Result<T>
{
    public bool Success { get; }
    public T? Value { get; }
    public string? ErrorMessage { get; }
    private Result(bool success, T? value = default, string? errorMessage = null)
    {
        Success = success;
        Value = value;
        ErrorMessage = errorMessage;
    }

    public static Result<T> Ok(T value) =>
        new Result<T>(true, value);

    public static Result<T> Fail(string message) => new Result<T>(false, default, message);
}