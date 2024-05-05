export default {
    customers: {
        title: "Cutomers",
        addCustomer: "Add Customer",
        editCustomer: "Edit Customer",
        form: {
            id: "ID",
            siren: "Siren",
            siret: "Siret",
            legalName: "Legal Name",
            actions: "Actions"
        },
        validation: {
            siren:{
                required: "Siren is required",
                max: "Siren must be 9 characters",
                num: "Siren must be numeric"
            },
            siret:{
                required: "Siret is required",
                max: "Siret must be 14 characters",
                num: "Siret must be numeric"
            },
            legalName:{
                required: "Siren is required"
            }
        },
    },
    orders: {
        title: "Orders",
        addOrder: "Add Order",
        editOrder: "Edit Order",
        form: {
            id: "ID",
            offer: "Offer",
            customer: "Customer",
            vendors: "Vendors",
            description: "Description",
            licenseCount: "license Count",
            actions: "Actions",
        },
        validation: {
            offer:{ required: "Offer is required" },
            customer:{ required: "Customer is required" },
            vendor:{ required: "Vendor is required" },
            description:{ required: "Description is required" },
            licenseCount:{
                required: "License count is required",
                num: "License count must be numeric"
            },
        },
    },
    deleteDialog:{
        title: "Are you sure you want to delete this item?"
    },
    buttons: {
        submit: "Submit",
        cancel: "Cancel",
    },
};
