<template>
  <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/dashboard">Mapper</router-link>

      <button class="navbar-toggler"
              type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="fa fa-bars"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav" v-if="showNavItems()">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link"
                         to="/cases">
              <i class="fas fa-database"></i>
              {{ $t('layout.cases') }}</router-link>
          </li>
          <li class="nav-item dropdown" v-if="showAdminLink()">
            <a class="nav-link dropdown-toggle" href="#" id="dropdownAdmin" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fas fa-toolbox"></i>
              {{ $t('layout.adminArea') }}
            </a>
            <ul class="dropdown-menu" aria-labelledby="dropdownAdmin">
              <li><router-link class="dropdown-item"
                               :to="{name: 'AdminSystem'}">{{ $t('admin.system.title') }}</router-link></li>
              <li><router-link :to="{ name: 'AdminUsersList' }" class="dropdown-item">{{ $t('admin.users.list') }}</router-link>
              </li>
              <li><router-link :to="{ name: 'AdminSchema' }" class="dropdown-item">{{ $t('layout.schema.title') }}</router-link>
              </li>
              <li><router-link :to="{ name: 'AdminCategories' }" class="dropdown-item">{{ $t('layout.categories.title') }}</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <Signout class="d-flex" />
      </div>
    </div>
  </nav>
</template>

<script>
 import Signout from '@/components/Signout.vue'

 export default {
   name: 'AppNav',
   components: { Signout },
   methods: {
     showAdminLink() {
       return this.$store.getters.isAdmin || this.$store.getters.isReviewer
     },
     showNavItems() {
       return this.$store.getters.isSignedIn
     }
   }
 }
</script>
