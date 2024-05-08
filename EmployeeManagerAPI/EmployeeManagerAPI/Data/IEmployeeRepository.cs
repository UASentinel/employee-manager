using EmployeeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagerAPI.Data;

public interface IEmployeeRepository
{
    Task AddAsync(Employee employee);
    Task<List<Employee>> GetAsync();
    Task<Employee> GetByIdAsync(int id);
    Task UpdateAsync(int id, Employee model);
    Task DeleteAsync(int id);
    Task<Employee> GetByEmailAsync(string email);
}
