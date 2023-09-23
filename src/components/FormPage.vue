<template>
  <div class="container mt-4">
    <div class="card">
      <div class="card-body">
        <h2>{{ isEditing ? 'Edit Employee' : 'Add a New Employee' }}</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">Add Name</label>
            <input type="text" id="name" v-model="form.employee_name" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="salary" class="form-label">Add Salary</label>
            <input type="text" id="salary" v-model="form.employee_salary" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="age" class="form-label">Add Age</label>
            <input type="number" id="age" v-model="form.employee_age" class="form-control" required>
          </div>
          <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update' : 'Submit' }}</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
// import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

export default {
  setup() {
    const route = useRoute();
    // const router = useRouter();
    const store = useStore();

    const isEditing = computed(() => !!route.params.id);

    const form = ref({
      employee_name: '',
      employee_salary: '',
      employee_age: '',
    });

    async function fetchEmployeeData() {
      if (isEditing.value) {
        const employeeId = route.params.id;
        try {
          const response = await fetch(`http://localhost:3000/api/employees/${employeeId}`);
          if (response.ok) {
            const employeeData = await response.json();
            console.log('Fetched employee data:', employeeData); 

            form.value.employee_name = employeeData.name;
            form.value.employee_salary = employeeData.salary;
            form.value.employee_age = employeeData.age;
         
          } else {
            throw new Error('Failed to fetch employee data');
          }
        } catch (error) {
          console.error('Error fetching employee data:', error);
          // router.push({ name: 'EditForm' });
        }
      }
    }
  

    watch(() => route.params.id, () => {
      fetchEmployeeData();
    });


    onMounted(fetchEmployeeData);
  
    async function submitForm() {
      const employeeData = {
        name: form.value.employee_name,
        salary: form.value.employee_salary,
        age: form.value.employee_age,
      };

      if (isEditing.value) {
        await updateEmployee(employeeData, route.params.id);
      } else {
        await createEmployee(employeeData);
      }
    }

    async function createEmployee(employeeData) {
      try {
        const response = await fetch('http://localhost:3000/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
          throw new Error('Failed to create employee');
        }

        const createdEmployee = await response.json();
        Swal.fire('Success', 'New employee added successfully!', 'success');

        store.commit('addEmployee', createdEmployee);

        form.value.employee_name = '';
        form.value.employee_salary = '';
        form.value.employee_age = '';
      } catch (error) {
        console.error('Error creating employee:', error);
        Swal.fire('Error', 'Failed to create employee', 'error');
      }
    }

    async function updateEmployee(employeeData, id) {
      try {
        const response = await fetch(`http://localhost:3000/api/employees/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
          throw new Error('Failed to update employee');
        }

        const updatedEmployee = await response.json();

        store.commit('updateEmployee', updatedEmployee);

        form.value.employee_name = '';
        form.value.employee_salary = '';
        form.value.employee_age = '';
      } catch (error) {
        console.error('Error updating employee:', error);
      }
    }

    return {
      isEditing,
      form,
      submitForm,
    };
  },
};
</script>
