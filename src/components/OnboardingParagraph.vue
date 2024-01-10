<template>
    <template v-if="isToday(new Date(date))">
        <p>
            Votre visite à lieu
            <strong>
                aujourd'hui à
                {{
                    new Intl.DateTimeFormat('fr-FR', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(date))
                }}.
            </strong>
        </p>
    </template>
    <template v-else>
        <p>
            Visite prévue le
            <strong>
                {{
                    new Intl.DateTimeFormat('fr-FR', {
                        dateStyle: 'full',
                    }).format(new Date(date))
                }}
                à
                {{
                    new Intl.DateTimeFormat('fr-FR', {
                        hour: 'numeric',
                        minute: 'numeric',
                    }).format(new Date(date))
                }}
            </strong>
            <span>.</span>
        </p>
        <p>
            Utilisez cette application le jour de votre visite pour avoir accès au
            <strong>coworking</strong>
            <template v-if="withParkingAccess">
                et au
                <strong>parking voitures</strong>
            </template>
            <span>.</span>
        </p>
    </template>
</template>

<script setup>
import { isToday } from 'date-fns';

defineProps({
    date: {
        type: String,
        required: true,
    },
    withParkingAccess: {
        type: Boolean,
        default: false,
    },
});
</script>
