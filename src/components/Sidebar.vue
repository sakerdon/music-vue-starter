<template>
<div class="sidebar">
    <ul class="sidebar__list">
        <li class="sidebar__item">
            <router-link to="/">Home</router-link>
        </li>

        <li class="sidebar__item">
            <router-link :to="{name: 'category'}">Category1</router-link>
        </li>

        <li class="sidebar__item">
            <router-link :to="{name: 'playlist'}">My PlayList</router-link>
        </li>

    </ul>
    
</div>
</template>
    