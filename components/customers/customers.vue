<template>
  <div class="page-container">
  <h1 class="my-10">{{text.customers.title}}</h1>

  <v-card>
    <!-- Search Components -->
    <template v-slot:text>
      <v-text-field
          v-model="search"
          label="Search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          hide-details
          single-line
      ></v-text-field>
    </template>

    <div class=" mt-5">
      <!-- Customer Data -->
      <v-data-table
            :headers="headers"
            :items="customers"
            :search="search"
            :sort-by="[{ key: 'calories', order: 'asc' }]"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <!-- Add Customer Dialog -->
              <DialogCustomer :form="editedItem" v-model="dialog" :edited-index="editedIndex" @save="save" @close="close"/>

              <!-- Delete Dialog Confirmation -->
              <DialogDelete v-model="dialogDelete" @save="deleteItemConfirm" @close="closeDelete"/>
            </v-toolbar>
          </template>

        <!--  Actions  -->
        <template v-slot:item.actions="{ item }">
            <v-icon
                class="me-2"
                size="small"
                @click="editItem(item)"
            >
              mdi-pencil
            </v-icon>
            <v-icon
                size="small"
                @click="deleteItem(item)"
                :disabled="!item.canDelete"
            >
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
    </div>

  </v-card>
  </div>

</template>

<script>
import axios from "axios";
import DialogCustomer from "~/components/customers/dialog-customer.vue";
import DialogDelete from "~/components/common/dialog-delete.vue";
import { API_URL } from '@/config';
import text from '@/locales/texte.js';

export default {
  components: {DialogDelete,DialogCustomer},
  data: () => ({
    text: text,
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: text.customers.form.id, key: 'id' },
      { title: text.customers.form.siret, key: 'siret'},
      { title: text.customers.form.siren, key: 'siren' },
      { title: text.customers.form.legalName, key: 'legalName' },
      { title: text.customers.form.actions, key: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: null,
      siren: '',
      siret: '',
      legalName: ''
    },
    defaultItem: {
      id: null,
      siren: '',
      siret: '',
      legalName: ''
    },
    customers: [],
  }),

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.fetchCustomers();
  },

  methods: {
    // Get list of customers
    fetchCustomers() {
      // Fetch customers from the API
      axios.get(`${API_URL}/api/customers/`)
          .then(response => {
            if (response.data.customers && response.data.customers.length > 0) {
              this.customers = response.data.customers;
            }
          })
          .catch(error => {
            console.error('Error fetching customers:', error);
          });
    },
    // Edit item
    editItem (item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    // Remove item
    deleteItem (item) {
      this.editedIndex = this.customers.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    // Delete item confirmation
    deleteItemConfirm () {
      // Delete customer from the API
      axios.delete(`${API_URL}/api/customers/`+this.editedItem.id)
          .then(response => {
              this.customers.splice(this.editedIndex, 1)
              this.closeDelete()
          })
          .catch(error => {
              console.error('Error deleting customers:', error);
              this.closeDelete()
          });
    },

    // Close Dialog delete
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    // Close Dialog Customer
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    // Save Customer
    save () {
      if (this.editedIndex > -1) {
        // Update customer from the API
        axios.put(`${API_URL}/api/customers/`+this.editedItem.id,this.editedItem)
            .then(response => {
              this.customers[this.editedIndex] = response.data.customer;
              this.close()
            })
            .catch(error => {
              console.error('Error updating customers:', error);
              this.close()
            });

      } else {
        // Add customer from the API
        axios.post(`${API_URL}/api/customers/`,this.editedItem)
            .then(response => {
              this.customers.push(response.data.customer)
              this.close()
            })
            .catch(error => {
              console.error('Error adding customers:', error);
              this.close()
            });
      }
    },
  },
}
</script>

<style type="text/css">
  .v-toolbar {
    background-color:transparent!important;
  }
  .page-container {
    padding: 0px 40px;
    height: 100%;
    align-content: center;
  }
  .add-button {
    background-color:#e2d6e8!important;
    padding: 10px 17px!important;
  }
</style>