using Microsoft.AspNetCore.Mvc;
using Presentation.Dto;
using Presentation.Repositories;
using System.Net;

namespace Presentation.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAllAsync();

            return StatusCode((int)HttpStatusCode.OK, users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser([FromRoute] int id)
        {
            var user = await _userRepository.GetAsync(id);

            return StatusCode((int)HttpStatusCode.OK, user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto entity)
        {
            var user = await _userRepository.CreateAsync(entity);

            return StatusCode((int)HttpStatusCode.Created, user);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto entity)
        {
            var user = await _userRepository.UpdateAsync(entity);

            return StatusCode((int)HttpStatusCode.OK, user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            var result = await _userRepository.DeleteAsync(id);

            return StatusCode((int)HttpStatusCode.OK, result);
        }
    }
}
