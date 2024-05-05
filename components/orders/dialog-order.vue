<template>
<v-dialog v-model="internalDialog" max-width="500px" class="mt-5">
  <!--  Add order button -->
  <template v-slot:activator="{ props }">
    <v-btn class="ml-4 mb-4 add-button" color="primary" dark v-bind="props">Add Order</v-btn>
  </template>
  <v-card>

    <!-- Title -->
    <v-card-title>
      <span class="text-h5">{{ formTitle }}</span>
    </v-card-title>

    <!-- Form -->
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="form.id" readonly label="Identifiant"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-select
                label="Offers"
                :items="offers"
                v-model="editedItemOfferId"
                :error-messages="editedItemOfferIdErrors"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-select
                label="Customer"
                :items="customersList"
                v-model="editedItemCustomerId"
                :error-messages="editedItemCustomerIdErrors"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-select
                v-model="form.vendors"
                :items="vendors"
                hint="Pick your favorite states"
                label="Select"
                multiple
                persistent-hint
                :error-messages="formVendorsErrors"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="form.description" :error-messages="descriptionErrors" label="Description"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="form.licenseCount" :error-messages="licenseCountErrors" label="License count"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <!-- Actions  -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="closeDialog">Cancel</v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="saveDialog">Save</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>
export default {
  props: {
    customersList: {
      type: Array,
      required: false
    },
    offers: {
      type: Array,
      required: false
    },
    vendors: {
      type: Array,
      required: false
    },
    form: {
      type: Object,
      required: false
    },
    dialog: {
      type: Boolean,
      required: false
    },
    editedIndex: {
      type: Number,
      required: false
    },
    save: {
      type: Function,
      required: false
    },
    close: {
      type: Function,
      required: false
    },
  },

  data: () => ({
    internalDialog: false,
    editedItemCustomerId: null,
    editedItemOfferId: null,
    formValid: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Add Order' : 'Edit Order'
    },
    // Handle the cases
    editedItemOfferIdErrors() {
      const errors = [];
      if (!this.editedItemOfferId) errors.push('Offer is required');
      return errors;
    },
    editedItemCustomerIdErrors() {
      const errors = [];
      if (!this.editedItemCustomerId) errors.push('Customer is required');
      return errors;
    },
    formVendorsErrors() {
      const errors = [];
      if (!this.form.vendors || this.form.vendors.length === 0) errors.push('Vendor is required');
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.form.description) errors.push('Description is required');
      // Add more validation rules for description if needed
      return errors;
    },
    licenseCountErrors() {
      const errors = [];
      if (!this.form.licenseCount) errors.push('License count is required');
      // Add more validation rules for license count if needed
      return errors;
    },
  },

  watch: {
    // Watch editIndex changes
    editedIndex(value) {
      if(this.editedIndex !== -1){
        this.editedItemOfferId = this.form.offer.id
        this.editedItemCustomerId = this.form.customer.id
        this.updateFormValidity();
      }else {
        this.editedItemOfferId = null
        this.editedItemCustomerId = null
      }
    },
    // Watch form changes
    form: {
      deep: true,
      handler() {
        this.updateFormValidity();
      }
    }
  },

  methods: {

    // Save Dialog
    saveDialog() {
      if (this.formValid) {
        this.form.offer = {"id": this.editedItemOfferId};
        this.form.customer = {"id": this.editedItemCustomerId};
        this.editedItemOfferId = null
        this.editedItemCustomerId = null
        this.$emit('save');
      }
    },

    // close Dialog
    closeDialog () {
      this.editedItemOfferId =  null
      this.editedItemCustomerId =  null
      this.formValid = false
      this.$emit('close');
    },

    // Check if all input fields are valid
    updateFormValidity() {
      this.formValid =
          this.descriptionErrors.length === 0 &&
          this.licenseCountErrors.length === 0 &&
          this.editedItemOfferIdErrors.length === 0 &&
          this.editedItemCustomerIdErrors.length === 0 &&
          this.formVendorsErrors.length === 0;
    }

  },
}
</script>