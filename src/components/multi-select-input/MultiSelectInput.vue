<template>
    <q-select filled :value="value" @input="$emit('update:value', $event.target.value)" multiple :options="options"
        style="width: 250px" />
</template>