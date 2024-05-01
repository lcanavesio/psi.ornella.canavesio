$(function () {
    'use strict';

    // Ambil semua formulir yang ingin kita terapkan gaya validasi kustom Bootstrap
    const forms = $('.needs-validation');

    // Loop melalui formulir dan mencegah pengiriman
    forms.on('submit', function (event) {
        const form = $(this);

        var actionInput = $(this).find("input[name='action']");

        if (!form[0].checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            $('.submit_form').html('Sending...');
            $('.submit_subscribe').html('Sending...');
            $('.submit_appointment').html('Sending...');
            const toast = new bootstrap.Toast($('.success_msg')[0]);
            const errtoast = new bootstrap.Toast($('.error_msg')[0]);
            var formData = form.serialize();
            $.ajax({
                type: "POST",
                url: "php/form_process.php",
                data: formData,
                success: function (response) {
                    if (response === 'success') {
                        if (actionInput.length > 0) {
                            if (actionInput.val() === 'appointment') {
                                $('.submit_appointment').html('Make Appointment');
                                const toast_appointment = new bootstrap.Toast($('.success_msg_appointment')[0]);
                                toast_appointment.show();
                            } else if (actionInput.val() === 'subscribe') {
                                $('.submit_subscribe').html('SEND');
                                const toast_comment = new bootstrap.Toast($('.success_msg_subscribe')[0]);
                                toast_comment.show();
                            }

                        } else {
                            toast.show()
                            $('.submit_form').html('Send Message');
                        }

                    } else {
                        // errtoast.show()
                        console.log('errorrrrrr')
                        $('.submit_form').html('Send Message');
                        $('.submit_subscribe').html('SEND');
                        $('.submit_appointment').html('Make Appointment');
                    }
                }
            });
        }

        form.addClass('was-validated');
    });
});