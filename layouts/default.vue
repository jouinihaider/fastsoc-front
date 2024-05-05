<template>
  <VApp>
    <VNavigationDrawer permanent>
      <VListItem title="FastSOC" link to="/"></VListItem>

      <VDivider/>

      <VListItem title="Customers" link to="/customers"></VListItem>
      <VListItem title="Orders" link to="/orders"></VListItem>
    </VNavigationDrawer>

    <VMain>
      <slot>
        <NuxtPage/>
      </slot>
    </VMain>
  </VApp>
</template>
