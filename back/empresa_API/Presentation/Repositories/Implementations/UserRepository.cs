using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Presentation.Data;
using Presentation.Dto;
using Presentation.Entities;

namespace Presentation.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _dataContext;

        public UserRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        public async Task<UserEntity> CreateAsync(CreateUserDto entity)
        {
            UserEntity userEntity = new UserEntity()
            {
                Name = entity.Name,
                CreateAt = DateTime.Now,
                Age = entity.Age,
                Email = entity.Email,
                Lastname = entity.Lastname
            };

            await _dataContext.Users.AddAsync(userEntity);
            await _dataContext.SaveChangesAsync();

            return userEntity;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await GetAsync(id);

            if (user is null)
            {
                return false;
            }

            _dataContext.Users.Remove(user);
            await _dataContext.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<UserEntity>> GetAllAsync()
        {
            return await _dataContext.Users
                .OrderByDescending(x => x.Id)
                .ToListAsync();
        }

        public async Task<UserEntity> GetAsync(int id)
        {
            var user = await _dataContext.Users.FindAsync(id);

            if (user is not null)
            {
                return user;
            }

            throw new KeyNotFoundException($"user with id {id} not found");
        }

        public async Task<UserEntity> UpdateAsync(UpdateUserDto entity)
        {
            var user = await GetAsync(entity.Id);

            user.Name = entity.Name;
            user.Email = entity.Email;
            user.Lastname = entity.Lastname;
            user.Age = entity.Age;

            _dataContext.Update(user);
            await _dataContext.SaveChangesAsync();

            return user;
        }
    }
}
