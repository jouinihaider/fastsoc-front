<template>
  <div class="page-container">
  <v-card title="Orders">
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
        :items="orders"
        :search="search"
    >
      <template v-slot:top>
        <v-toolbar>

          <!-- Add Order Dialog -->
          <DialogOrder :form="editedItem" v-model="dialog" :vendors="vendors" :offers="offers" :customers-list="customersList" :edited-index="editedIndex" @save="save" @close="close"/>

          <!-- Delete Dialog Confirmation -->
          <DialogDelete v-model="dialogDelete" @save="deleteItemConfirm" @close="closeDelete"/>
        </v-toolbar>
      </template>

      <template v-slot:item.vendors="{ item }">
        <span class="" v-for="(v,index) in item.vendors" > {{ getVendorName(v) }} {{ index !== item?.vendors?.length-1 ? ',' : '' }}</span>
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
import DialogDelete from "~/components/common/dialog-delete.vue";
import DialogOrder from "~/components/orders/dialog-order.vue";
import { API_URL } from '@/config';

export default {
  components: {DialogOrder, DialogDelete},
  data: () => ({
    editedItemCustomerId: null,
    editedItemOfferId: null,
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: 'ID', key: 'id' },
      { title: 'Offer', key: 'offer.name',},
      { title: 'Customer', key: 'customer.legalName' },
      { title: 'Vendors', key: 'vendors',},
      { title: 'Description', key: 'description' },
      { title: 'license Count', key: 'licenseCount' },
      { title: 'Actions', key: 'actions', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      id: null,
      offer: '',
      customer: '',
      vendors: [],
      description: '',
      licenseCount: ''
    },
    defaultItem: {
      id: null,
      offer: '',
      customer: '',
      vendors: [],
      description: '',
      licenseCount: ''
    },
    vendors: [],
    offers: [],
    orders: [],
    customersList: [],
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Order' : 'Edit Order'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.fetchOrders();
  },

  methods: {
    getVendorName (id) {
      return this.vendors.filter(v => v.value === id)[0].title;
    },

    fetchOrders() {
      // Fetch orders infos from the API
      axios.get(`${API_URL}/api/orders/infos`)
          .then(response => {
            if (response.data) {
              this.vendors = response.data.data.vendors;
              this.offers = response.data.data.offers;
              this.customersList = response.data.data.customers;
            }
          })
          .catch(error => {
            console.error('Error fetching orders infos:', error);
          });

      // Fetch orders from the API
      axios.get(`${API_URL}/api/orders/`)
        .then(response => {
          if (response.data.orders && response.data.orders.length > 0) {
            this.orders = response.data.orders;
          }
        })
        .catch(error => {
          console.error('Error fetching orders:', error);
        });
  },

    // Edit item
    editItem (item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    // Remove item
    deleteItem (item) {
      this.editedIndex = this.orders.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    // Delete item confirmation
    deleteItemConfirm () {
      // Delete Order from the API
      axios.delete(`${API_URL}/api/orders/`+this.editedItem.id)
          .then(response => {
              this.orders.splice(this.editedIndex, 1)
              this.closeDelete()
          })
          .catch(error => {
            console.error('Error deleting orders:', error);
          });
    },

    // Save Dialog delete
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // Close Order
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
        this.editedItemOfferId = null
        this.editedItemCustomerId = null
      })
    },

    // Save Order
    save () {
      if (this.editedIndex > -1) {
        // Update Order from the API
        axios.put(`${API_URL}/api/orders/`+this.editedItem.id, {
          id : this.editedItem.id,
          offer_id : this.editedItem.offer.id,
          customer_id : this.editedItem.customer.id,
          license_count : this.editedItem.licenseCount,
          description : this.editedItem.description,
          vendors : this.editedItem.vendors,
        })
        .then(response => {
            Object.assign(this.orders[this.editedIndex], response.data.order);
            this.close()
        })
        .catch(error => {
          console.error('Error updating orders:', error);
          this.close()
        });

      } else {
        // Add Order from the API
        axios.post(`${API_URL}/api/orders/`,{
          offer_id : this.editedItem.offer.id,
          customer_id : this.editedItem.customer.id,
          license_count : this.editedItem.licenseCount,
          description : this.editedItem.description,
          vendors : this.editedItem.vendors,
        })
        .then(response => {
            this.orders.push(response.data.order)
            this.close()
        })
        .catch(error => {
          console.error('Error adding orders:', error);
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