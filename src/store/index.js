import { createStore } from 'vuex';

export default createStore({
  state: {
    employees: [],
    newEmployee: null,
  },
  getters: {
    getEmployees: (state) => state.employees,
    getNewEmployee: (state) => state.newEmployee,
  },
  mutations: {
    setEmployees(state, employees) {
      state.employees = employees;
    },
    addEmployee(state, newEmployee) {
      state.newEmployee = newEmployee;
      state.employees.push(newEmployee);
    },
    updateEmployee(state, updatedEmployee) {
      const index = state.employees.findIndex((employee) => employee._id === updatedEmployee._id);
      if (index !== -1) {
        state.employees.splice(index, 1, updatedEmployee);
      }
    },
    deleteEmployee(state, employeeId) {
      const index = state.employees.findIndex((employee) => employee._id === employeeId);
      if (index !== -1) {
        state.employees.splice(index, 1);
      }
    },
  },
  actions: {
    async fetchEmployees({ commit }) {
      try {
        const response = await fetch('http://localhost:3000/api/employees'); 
        const data = await response.json();
        commit('setEmployees', data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    },
    async createEmployee({ commit }, newEmployee) {
      try {
        const response = await fetch('http://localhost:3000/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEmployee),
        });

        if (!response.ok) {
          throw new Error('Failed to create employee');
        }

        const createdEmployee = await response.json();
        commit('addEmployee', createdEmployee);
      } catch (error) {
        console.error('Error creating employee:', error);
      }
    },
    async updateEmployee({ commit }, updatedEmployee) {
      try {
        const response = await fetch(`http://localhost:3000/api/employees/${updatedEmployee._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedEmployee),
        });

        if (!response.ok) {
          throw new Error('Failed to update employee');
        }

        commit('updateEmployee', updatedEmployee);
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    },
    async deleteEmployee({ commit }, employeeId) {
      try {
        const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete employee');
        }

        commit('deleteEmployee', employeeId);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
  },
});
