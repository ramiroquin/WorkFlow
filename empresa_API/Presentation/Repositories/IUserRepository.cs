using Presentation.Dto;
using Presentation.Entities;

namespace Presentation.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<UserEntity>> GetAllAsync();

        Task<UserEntity> GetAsync(int id);

        Task<UserEntity> CreateAsync(CreateUserDto entity);

        Task<UserEntity> UpdateAsync(UpdateUserDto entity);

        Task<bool> DeleteAsync(int id);
    }
}
