<template>
    <div>
     <h1>{{ page.status }}</h1> <!-- it works -->
     <slot />
    </div>
</template>
   
<script setup>
   const { page } = useContent();
   
   console.log(page.value.status); // but this doesn't work, shows 'page' as "undefined"
</script>