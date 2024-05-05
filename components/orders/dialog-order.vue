<template>
<v-dialog v-model="internalDialog" max-width="500px" class="mt-5">
  <!--  Add order button -->
  <template v-slot:activator="{ props }">
    <v-btn class="ml-4 mb-4 add-button" color="primary" dark v-bind="props">{{text.orders.addOrder}}</v-btn>
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
            <v-text-field v-model="form.id" readonly :label="text.orders.form.id"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-select
                :label="text.orders.form.offer"
                :items="offers"
                v-model="editedItemOfferId"
                :error-messages="editedItemOfferIdErrors"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-select
                :label="text.orders.form.customer"
                :items="customersList"
                v-model="editedItemCustomerId"
                :error-messages="editedItemCustomerIdErrors"
            ></v-select>
          </v-col>

          <v-col cols="12" md="4" sm="6">
            <v-select
                v-model="form.vendors"
                :items="vendors"
                :label="text.orders.form.vendors"
                multiple
                persistent-hint
                :error-messages="formVendorsErrors"
            ></v-select>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="form.description" :error-messages="descriptionErrors" :label="text.orders.form.description"></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="6">
            <v-text-field v-model="form.licenseCount" :error-messages="licenseCountErrors" :label="text.orders.form.licenseCount"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <!-- Actions  -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="closeDialog">{{ text.buttons.cancel }}</v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="saveDialog">{{ text.buttons.submit }}</v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>
</template>
<script>
import text from "~/locales/texte.js";

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
    text: text,
    internalDialog: false,
    editedItemCustomerId: null,
    editedItemOfferId: null,
    formValid: false,
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? text.orders.addOrder : text.orders.editOrder
    },
    // Handle the cases
    editedItemOfferIdErrors() {
      const errors = [];
      if (!this.editedItemOfferId) errors.push(text.orders.validation.offer.required);
      return errors;
    },
    editedItemCustomerIdErrors() {
      const errors = [];
      if (!this.editedItemCustomerId) errors.push(text.orders.validation.customer.required);
      return errors;
    },
    formVendorsErrors() {
      const errors = [];
      if (!this.form.vendors || this.form.vendors.length === 0) errors.push(text.orders.validation.vendor.required);
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      if (!this.form.description) errors.push(text.orders.validation.description.required);
      return errors;
    },
    licenseCountErrors() {
      const errors = [];
      if (!this.form.licenseCount) errors.push(text.orders.validation.licenseCount.required);
      if (this.form.licenseCount && !/^\d+$/.test(this.form.licenseCount)) errors.push(text.orders.validation.licenseCount.num);
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