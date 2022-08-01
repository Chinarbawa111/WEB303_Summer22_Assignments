// your code goes here
$(function() {
    var character = [{
            name: "Iron Man",
            description: "Iron Man is a superhero appearing in American comic books published by Marvel Comics",
            age: 48,
            dob: "1970-03-29"
        },
        {
            name: "Hulk",
            description: "Hulk has dissociative identity disorder (DID), is primarily represented by the alter Hulk, a green-skinned, hulking and muscular humanoid possessing a limitless degree of physical strength",
            age: 36,
            dob: "1986-06-25"
        },
        {
            name: "Thor",
            description: "Thor is a prominent god in Germanic paganism. In Norse mythology, he is a hammer-wielding god associated with lightning, thunder, storms, sacred groves and trees, strength, the protection of mankind, hallowing, and fertility",
            age: 38,
            dob: "1983-09-11"
        }, {
            name: "Thanos",
            description: "Thanos stands head and shoulders above the average human or humanoid, with powerful muscles, a broad face, and a purple-hued skintone.",
            age: 54,
            dob: "1968-02-1968"
        }, {
            name: "Spider-Man",
            description: "Spider-Man is conscientious photographer Peter Parker's alter ego, a web-slinging, crime-fighting protector of justice.",
            age: 38,
            dob: "1984-09-20"
        }
    ]
    var $tbody = $('#tbody');
    var cache = [];
    var $search = $('#search')
    $.each(character, function(key, val) {

        var $row = $('<tr></tr>'); // Create their row
        // populate data
        $row.append($('<td></td>').text(val.name));
        $row.append($('<td></td>').text(val.description));
        $row.append($('<td></td>').text(val.age));
        $row.append($('<td></td>').text(val.dob));
        $tbody.append($row); // Add row to the tbody

        cache.push({ // Create the cache that contains several values
            element: $row, // Reference to the row element
            // The text we're searching against (which in this case is first name)
            name: val.name.trim().toLowerCase(),

        });

        function filter() {
            var query = this.value.trim().toLowerCase(); // Get query
            if (query) { // If there’s a query
                cache.forEach(function(name) { // Each cache entry
                    var index = 0; // Set index to 0
                    index = name.name.indexOf(query); // Is text in there?
                    // Show / hide
                    if (index != -1) {
                        name.element.addClass('active')
                    } else {
                        name.element.removeClass('active')
                    }
                });
            }
        }
        // If browser supports input event 
        if ('oninput' in $search[0]) {
            // Use input event to call filter()
            $search.on('input', filter);
        } else { // Otherwise
            // Use keyup event to call filter() 
            $search.on('keyup', filter);
        }

        //Sorting
        var compare = { // Declare object
            name: function(a, b) { // Add name() method
                a = a.replace(/^the /i, ''); // Remove The
                b = b.replace(/^the /i, ''); // Remove The
                if (a < b) { // If a less than b
                    return -1; // Return -1
                } else { // Otherwise
                    // If a greater than b return 1 otherwise return 0
                    return a > b ? 1 : 0;
                }
            },
            duration: function(a, b) { // duration() method
                a = a.split(':'); // Split time at colon
                b = b.split(':'); // Split time at colon
                // Convert the time to seconds
                a = Number(a[0]) * 60 + Number(a[1]);
                // Convert the time to seconds
                b = Number(b[0]) * 60 + Number(b[1]);
                return a - b; // Return a minus b
            },
            date: function(a, b) { // Add a method called date
                a = new Date(a); // New object to hold date
                b = new Date(b); // New object to hold date
                return a - b; // Return a minus b
            }

        }
        $('.sortable').each(function() {
            var $table = $(this); // This table
            var $tbody = $table.find('tbody'); // Table body
            var $controls = $table.find('th'); // Table headers
            var rows = $tbody.find('tr').toArray(); // Array of rows
            $controls.on('click', function() { // Event handler
                var $header = $(this); // Get header
                var order = $header.data('sort'); // Get data type
                var column;
                if ($header.is('.ascending') || $header.is('.descending')) {
                    // Toggle to other class
                    $header.toggleClass('ascending descending');
                    // Reverse the array
                    $tbody.append(rows.reverse());
                } else {

                    $header.addClass('ascending'); // Add class to header
                    // Remove asc or desc from all other headers
                    $header.siblings().removeClass('ascending descending');
                    // If compare object has method of that name 
                    if (compare.hasOwnProperty(order)) {
                        column = $controls.index(this); // Column’s index no
                        rows.sort(function(a, b) { // Call sort() on rows
                            a = $(a).find('td').eq(column).text(); // Text of column row a
                            b = $(b).find('td').eq(column).text(); // Text of column row b
                            return compare[order](a, b); // Call compare method
                        });
                        $tbody.append(rows);
                    };
                }
            });
        });


    });
});