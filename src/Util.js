export const getLastItem = (item, ind) => {
    const list = item.split(/\//)
    const trimed_list = list.filter(item => item.length > 0)
    const index = trimed_list[trimed_list.length - parseInt(ind)]
    return index
}
