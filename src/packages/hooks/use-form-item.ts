import {computed, ref} from "vue";

import {isFunction, isUndefined} from "lodash";

function useFormItem<T>(props: T | any, model: any) {
    const options = ref([])
    const isLoading = ref(false)

    const isView = computed(() => {
        if (isFunction(props.view)) {
            return props.view(props.formState)
        }
        return isUndefined(props.view) ? false : props.view
    })

    const viewValue = computed(() => {
        if (isFunction(props.format)) {
            return props.format({value: model.value, formState: props.formState})
        }
        const findValue = options.value.find(((item: Record<string, any>) => item[props.valueKey] == model.value))
        return findValue ? findValue[props.labelKey] : model.value
    })

    const viewSlot = computed(() => {
        return props.viewSlot
    })

    const handleChange = () => {
        if (isFunction(props.change)) {
            props.change(model.value)
        }
    }

    async function loadOptions() {
        isLoading.value = true
        let res = []
        if (isFunction(props.options)) {
            res = props.options(props.formState);
        } else if (props.options) {
            res = props.options;
        } else if (isFunction(props.remoteOptions)) {
            res = await props.remoteOptions(props.formState)
        }
        options.value = res
        isLoading.value = false
    }

    return {
        isView,
        viewSlot,
        viewValue,
        options,
        isLoading,
        handleChange,
        loadOptions
    }
}

export {useFormItem}