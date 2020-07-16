// 行政检查


const inspection = {
    state: {
        inspectionOrderId:'', //当前记录id
        inspectionFileId:'', //当前文书id
        inspectionTempleteId:'', //行政检查模板id
        inspectionFileEdit:'', //行政检查模板id
    },
    mutations: {
        set_inspection_orderId(state, data) {
            state.inspectionOrderId = data;
        },
        set_inspection_fileId(state, data) {
            state.inspectionFileId = data;
        },
        set_inspection_templeteId(state, data) {
            state.inspectionTempleteId = data;
        },
        set_inspection_fileEdit(state, data) {
            state.inspectionFileEdit = data;
        },

    }
}
export default inspection