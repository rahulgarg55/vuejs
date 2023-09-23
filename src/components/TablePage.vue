<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h2>Employee List</h2>
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Salary</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="employee in employees" :key="employee._id">
              <td>{{ employee._id }}</td>
              <td>{{ employee.name }}</td>
              <td>{{ employee.salary }}</td>
              <td>{{ employee.age }}</td>
              <td>
                <div class="btn-group" role="group">
                  <router-link :to="{ name: 'EditForm', params: { id: employee._id }}" class="btn btn-primary">
                    Edit
                  </router-link>
                  <button @click="deleteEmployee(employee._id)" class="btn btn-danger">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';

export default {
  setup() {
    const employees = ref([]);
    const store = useStore();
    // const router = useRouter();

    onMounted(fetchEmployees);

    async function fetchEmployees() {
      try {
        const response = await fetch('http://localhost:3000/api/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        employees.value = data;
        store.commit('setEmployees', data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    }

    // const deleteEmployee = async (employeeId) => {
    //   try {
    //     const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`, {
    //       method: 'DELETE',
    //     });

    //     if (!response.ok) {
    //       throw new Error('Failed to delete employee');
    //     }
    //     fetchEmployees();
    //   } catch (error) {
    //     console.error('Error deleting employee:', error);
    //   }
    // };
    const deleteEmployee = async (employeeId) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel',
    });

    if (result.isConfirmed) {
      const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }

      Swal.fire('Deleted!', 'The employee has been deleted successfully.', 'success');

      fetchEmployees();
    }
  } catch (error) {
    console.error('Error deleting employee:', error);

    Swal.fire('Error', 'Failed to delete employee', 'error');
  }
};

    return {
      employees,
      deleteEmployee,
    };
  },
};
</script>
