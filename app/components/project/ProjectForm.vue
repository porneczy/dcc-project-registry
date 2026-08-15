<script setup lang="ts">
import useVuelidate from '@vuelidate/core'
import {
  minLength,
  minValue,
  required,
} from '@vuelidate/validators'
import type { DateValue } from '@internationalized/date'
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date'
import { CalendarIcon } from '@lucide/vue'

interface ProjectFormData {
  name: string
  description: string
  startDate: string
  budget: number
}

const props = defineProps<{
  initialValues?: ProjectFormData
  submitLabel?: string
}>()

const emit = defineEmits<{
  submit: [project: ProjectFormData]
  cancel: []
}>()

const name = ref(props.initialValues?.name ?? '')
const description = ref(props.initialValues?.description ?? '')
const budget = ref<number | undefined>(props.initialValues?.budget)
const startDate = ref(props.initialValues?.startDate ?? '')
const date = ref<DateValue>()

const minDate = new CalendarDate(2000, 1, 1)
const maxDate = new CalendarDate(2100, 12, 31)

const dateFormatter = new DateFormatter('hu-HU', {
  dateStyle: 'medium',
})

if (startDate.value) {
  try {
    date.value = parseDate(startDate.value)
  } catch {
    date.value = undefined
  }
}

const rules = computed(() => ({
  name: {
    required,
    minLength: minLength(3),
  },
  description: {
    required,
    minLength: minLength(10),
  },
  startDate: {
    required,
  },
  budget: {
    required,
    minValue: minValue(1),
  },
}))

const v$ = useVuelidate(rules, {
  name,
  description,
  startDate,
  budget,
})

const handleSubmit = async () => {
  name.value = name.value.trim()
  description.value = description.value.trim()

  const isValid = await v$.value.$validate()

  if (!isValid || budget.value === undefined) {
    return
  }

  emit('submit', {
    name: name.value,
    description: description.value,
    startDate: startDate.value,
    budget: budget.value,
  })
}

const handleDateChange = (value: DateValue | undefined) => {
  if (!value) {
    return
  }

  date.value = value
  startDate.value = value.toString()
}
</script>

<template>
  <form
    class="space-y-6"
    @submit.prevent="handleSubmit"
  >
    <div class="space-y-2">
      <Label for="name">
        Projekt neve
      </Label>

      <Input
        id="name"
        v-model="name"
        placeholder="Projekt neve"
        :aria-invalid="v$.name.$error"
      />

      <p
        v-if="v$.name.$error"
        class="text-sm text-destructive"
      >
        A projekt neve legalább 3 karakter és kötelező.
      </p>
    </div>

    <div class="space-y-2">
      <Label for="description">
        Leírás
      </Label>

      <Textarea
        id="description"
        v-model="description"
        placeholder="Projekt leírása"
        rows="4"
        :aria-invalid="v$.description.$error"
      />

      <p
        v-if="v$.description.$error"
        class="text-sm text-destructive"
      >
        A leírás legalább 10 karakter és kötelező.
      </p>
    </div>

    <div class="space-y-2">
      <Label for="startDate">
        Kezdési dátum
      </Label>

      <Popover>
        <PopoverTrigger as-child>
          <Button
            id="startDate"
            variant="outline"
            class="w-full justify-start text-left font-normal"
            :class="{ 'border-destructive': v$.startDate.$error }"
            :aria-invalid="v$.startDate.$error"
          >
            <CalendarIcon />

            <span>
              {{
                date
                  ? dateFormatter.format(date.toDate(getLocalTimeZone()))
                  : 'Válassz kezdési dátumot'
              }}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          class="w-auto p-0"
          align="start"
        >
          <Calendar
            v-model="date"
            :min-value="minDate"
            :max-value="maxDate"
            layout="month-and-year"
            initial-focus
            @update:model-value="handleDateChange"
          />
        </PopoverContent>
      </Popover>

      <p
        v-if="v$.startDate.$error"
        class="text-sm text-destructive"
      >
        A kezdési dátum megadása kötelező.
      </p>
    </div>

    <div class="space-y-2">
      <Label for="budget">
        Költségvetés
      </Label>

      <Input
        id="budget"
        v-model.number="budget"
        type="number"
        min="1"
        placeholder="0"
        :aria-invalid="v$.budget.$error"
      />

      <p
        v-if="v$.budget.$error"
        class="text-sm text-destructive"
      >
        A költségvetés legalább 1 Ft és kötelező.
      </p>
    </div>

    <div class="flex justify-end gap-3">
      <Button
        type="button"
        variant="outline"
        @click="emit('cancel')"
      >
        Mégse
      </Button>

      <Button type="submit">
        {{ submitLabel ?? 'Projekt létrehozása' }}
      </Button>
    </div>
  </form>
</template>
