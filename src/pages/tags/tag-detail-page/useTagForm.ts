import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { fetchTags, fetchTag, putTag } from '@utils/fetch';

export const useTagForm = () => {
    const route = useRoute();
    const formData = ref({
        _id: '',
        description: '',
        contractId: '',
        tags: [''],
        title: '',
        time: [] //@TODO Add a proper type here
    });
    const options = ref(['']);

    const queryClient = useQueryClient();

    const tagId = computed(() => route.params.id as string)

    const { data, isError, isLoading, isPending } = useQuery({
        queryKey: ['tag', tagId],
        queryFn: () => fetchTag(tagId.value)
    });

    watch(data, (newData) => {
        if (newData) {
            formData.value.title = newData.title
            formData.value.description = newData.description
            formData.value._id = newData._id
            formData.value.contractId = newData.contractId
            formData.value.tags = newData.tags,
            formData.value.time = newData.time
        }
    });

    onMounted(async () => {
        const tags = await fetchTags();
        options.value = tags.map(tag => tag.name);
    })

    const { mutate } = useMutation({
        mutationFn: putTag,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['tag'] })
        },
    })

    const onSubmit = () => {
        mutate(formData.value);
    }

    return {
        isError,
        isLoading,
        isPending,
        onSubmit,
        formData,
        options
    }
}
