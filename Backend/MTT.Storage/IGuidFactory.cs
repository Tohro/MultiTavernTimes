namespace MTT.Storage;

internal interface IGuidFactory
{
    Guid GetGuid();
    
}
internal class GuidFactory : IGuidFactory
{
    public Guid GetGuid()
    {
        return Guid.NewGuid();
    }
}