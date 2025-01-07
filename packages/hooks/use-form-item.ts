import {computed, onMounted, ref, watch} from "vue";
import {isUndefined} from "lodash";

function useFormItem<T>(props: T, model: any) {


    const isView = computed(() => {
        if (typeof props.view === 'function') {
            return props.view(props.formState)
        }
        return isUndefined(props.view) ? false : props.view
    })

    const viewValue = computed(() => {
        const findValue = options.value.find(((item: Record<string, any>) => item[props.valueKey] == model.value))
        return findValue ? findValue[props.labelKey] : ''
    })

    const viewSlot = computed(() => {
        return props.viewSlot
    })

    const handleChange = () => {
        if (typeof props.change === 'function') {
            props.change(internalModel.value)
        }
    }


    const options = ref([])

    async function initOptions() {
        let res = []
        if (typeof props.options === 'function') {
            res = props.options(props.formState);
        } else if (props.options) {
            res = props.options;
        } else if (props.remoteOptions === 'function') {
            res = await props.remoteOptions(props.formState)
        }
        options.value = res
    }

    return {
        isView,
        viewSlot,
        viewValue,
        options,
        handleChange,
    }
}

export {useFormItem}