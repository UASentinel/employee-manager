using EmployeeManagerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagerAPI.Data;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly AppDbContext _dbContext;

    public EmployeeRepository(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task AddAsync(Employee employee)
    {
        await _dbContext.Set<Employee>().AddAsync(employee);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<List<Employee>> GetAsync()
    {
        return await _dbContext.Employees.ToListAsync();
    }

    public async Task<Employee> GetByIdAsync(int id)
    {
        return await _dbContext.Employees.FindAsync(id);
    }

    public async Task UpdateAsync(int id, Employee model)
    {
        var employeee = await _dbContext.Employees.FindAsync(id);
        if (employeee == null)
        {
            throw new Exception("Employee not found");
        }
        employeee.Name = model.Name;
        employeee.Phone = model.Phone;
        employeee.Age = model.Age;
        employeee.Salary = model.Salary;
        await _dbContext.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var employeee = await _dbContext.Employees.FindAsync(id);
        if (employeee == null)
        {
            throw new Exception("Employee not found");
        }
        _dbContext.Employees.Remove(employeee);
        await _dbContext.SaveChangesAsync();
    }

    public async Task<Employee> GetByEmailAsync(string email)
    {
        return await _dbContext.Employees.Where(x => x.Email == email).FirstOrDefaultAsync();
    }
}
