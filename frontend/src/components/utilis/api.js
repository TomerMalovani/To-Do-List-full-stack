import $ from "jquery"


export function getActivities(successCallback, errorCallback) {
    $.ajax({
        type: "GET",
        url: "tasks/get",
        dataType: "json",
        success: successCallback,
        error: errorCallback
    });
}

export function createTask(task, successCallback, errorCallback) {
    $.ajax({
        type: "POST",
        url: "tasks/create",
        contentType: "application/json",
        data: JSON.stringify(task),
        success: successCallback,
        error: errorCallback
    });
}
export function DeleteTask(task, successCallback, errorCallback) {

    $.ajax({
        type: "DELETE",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(task),
        url: "tasks/delete",
        success: successCallback,
        error: errorCallback
    });
}

export function starItem(task, successCallback, errorCallback) {

    $.ajax({
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(task),
        url: "tasks/star",
        success: successCallback,
        error: errorCallback
    });
}




export default getActivities;
