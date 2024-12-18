defaultHtml = `
    <div class="view-pane view-pane-title"></div>
        <h1></h1>
    <div class="field field-name-field-undergrad-award-type field-type-taxonomy-term-reference field-label-inline clearfix">
        <div class="field-label">Award type:&nbsp;</div>
        <div class="field-items">
            <div class="field-item"></div>
        </div>
    </div>
    <div class="field field-name-field-undergrad-award-aff field-type-taxonomy-term-reference field-label-inline clearfix">
        <div class="field-items">
        </div>
    </div>
    <div class="field field-name-field-undergrad-award-desc field-type-text-long field-label-above">
        <div class="field-label">Award description:&nbsp;</div>
        <div class="field-items">
            <div class="field-item even"><p></p></div>
        </div>
    </div>
    <div class="field field-name-field-undergrad-award-valuedesc field-type-text-long field-label-above">
        <div class="field-label">Value description:&nbsp;</div>
        <div class="field-items">
            <div class="field-item even"><p></p></div>
        </div>
    </div>
    <div class="field field-name-field-undregrad-award-enroll field-type-taxonomy-term-reference field-label-inline clearfix">
        <div class="field-label">Level:&nbsp;</div>
        <div class="field-items">
            <div class="field-item"></div>
        </div>
    </div>
    <div class="field field-name-field-undergrad-award-program field-type-taxonomy-term-reference field-label-inline clearfix">
        <div class="field-label">Program:</div>
        <div class="field-items">
            <div class="field-item"><div class="term-tree-list"></div></div>
        </div>
    </div>
    <div class="field field-name-field-undergrad-award-citizen field-type-taxonomy-term-reference field-label-inline clearfix">
        <div class="field-label">Citizenship:&nbsp;</div>
        <div class="field-items">
            <div class="field-item"></div>
        </div>
    </div>
    <div class="field field-name-field-undergrad-award-ptype field-type-taxonomy-term-reference field-label-above">
        <div class="field-label">Selection process:&nbsp;</div>
        <div class="field-items">
            <div class="field-item"></div>
        </div>
    </div>
    <div class="field field-name-field-undergard-award-term field-type-taxonomy-term-reference field-label-above">
        <div class="field-label">Term:&nbsp;</div>
        <div class="field-items">
            <div class="field-item"></div>
        </div>
    </div>
    <div class="field field-name-field-undergrad-award-deadline field-type-taxonomy-term-reference field-label-above">
        <div class="field-label">Deadline:&nbsp;</div>
        <div class="field-items">
            <div class="field-item"></div>
        </div>
    </div>
    <div class="field field-name-field-undergrad-award-cont-term field-type-taxonomy-term-reference field-label-above">
        <div class="field-label">Contact:</div>
        <div class="field-items">
            <div class="field-item">
                <div class="term-tree-list"></div>
            </div>
        </div>
    </div>
    `;

document.getElementById("site-navigation-wrapper").remove();

const sideBar = document.getElementById("site-sidebar-wrapper");
const wrapper = document.createElement('div');
wrapper.classList.add('view-pane--wrapper');
wrapper.style.display = 'none';
sideBar.appendChild(wrapper);
const viewAwardPane = document.createElement('div');
viewAwardPane.classList.add('view-pane');
viewAwardPane.innerHTML = defaultHtml;
wrapper.appendChild(viewAwardPane);

const headerHeight = 170;

window.addEventListener('scroll', function() {
  // Get the scroll position from the top

  let scrollPosition = window.scrollY;

  // If the scroll position is greater than the header's height, stop the pane from going up
  if (scrollPosition <= headerHeight) {
    sideBar.style.top = `${headerHeight - scrollPosition + 30}px`;  // Adjust top to prevent overlap
  } else {
    // Otherwise, keep the right pane fixed at the top
    sideBar.style.top = '30px';
  }
});


document.querySelectorAll('div.views-row').forEach(item => {
    const link = item.querySelector('a');

    if (link) {
        // Get the href attribute
        const href = link.getAttribute('href');

        // Send the href as part of the data in the request body
        fetch(`http://localhost:5000/api/get-preview?link=${encodeURIComponent(href)}`,
        {
              method: 'GET',  // GET method for reading data
              headers: {
                  'Content-Type': 'application/json'  // Expect JSON in the response
              }
        })
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
            item.children[1].remove();

            const description = data.description;
            const deadline = data.deadline;
            const value = data.value;
            const additionalTags = data.additional_tags;


            const valueSection = document.createElement('div');
            const deadlineSection = document.createElement('div');
            const tagsSection = document.createElement('div');

            const wrapperSection = document.createElement('div');
            const outPaddingSection = document.createElement('div');

            // Add content to the new subsection
            valueSection.textContent = "Value: " + value;
            deadlineSection.textContent = "Deadline: " + deadline;
            tagsSection.textContent = "Tags: " + additionalTags;

            valueSection.classList.add('views-field', 'views-field-award-value');
            deadlineSection.classList.add('views-field', 'views-field-award-deadline');
            tagsSection.classList.add('views-field', 'views-field-award-tags');
            wrapperSection.classList.add('views-field-wrapper')



            // Append the new subsection to the parent div
            wrapperSection.appendChild(valueSection);
            wrapperSection.appendChild(deadlineSection);
            item.appendChild(wrapperSection);
            item.appendChild(tagsSection);
        })  // Handle the server response
        .catch(error => console.error('Error:', error));  // Handle errors


        item.addEventListener('click', function() {
            const otherActive = item.parentElement.querySelector('.active-award');
            item.classList.toggle('active-award');

            if(item.classList.contains('active-award')){
                if (otherActive) {
                  otherActive.classList.remove('active-award');
                }
                fetch(`${link.href}`)  // Replace with your URL
                .then(response => response.text())  // Parse the response as text (HTML)
                .then(html => {
                  // Create a temporary DOM element to hold the fetched HTML
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = html;

                  // Extract the specific div from the returned HTML
                  const headerDiv = tempDiv.querySelector('.uw-site--title');  // Adjust selector as needed
                  const contentDiv = tempDiv.querySelector('.content_node');

                  viewAwardPane.innerHTML = '';
                  // Check if the div exists and insert it into the container
                  if (headerDiv && contentDiv) {
                      const h1Elements = headerDiv.querySelectorAll('h1');  // Get all <h1> elements inside the div
                      h1Elements.forEach(h1 => {
                          const h2 = document.createElement('h2');  // Create a new <h2> element
                          h2.innerHTML = h1.innerHTML;              // Copy the content from <h1> to <h2>
                          h1.parentNode.replaceChild(h2, h1);
                      });

                      const closeButton = document.createElement('div');
                      closeButton.classList.add('close');
                      closeButton.innerHTML = '×';  // '×' is a common close symbol
                      // Step 5: Add event listener to remove the header when clicked
                      closeButton.addEventListener('click', () => {
                          item.classList.remove('active-award');
                          wrapper.style.display = 'none';
                          wrapper.style.zIndex = '-10';  // Hides the header when the button is clicked
                      });
                      viewAwardPane.appendChild(headerDiv);
                      viewAwardPane.appendChild(closeButton);
                      viewAwardPane.appendChild(contentDiv);
                      wrapper.style.display = 'block';
                      wrapper.style.zIndex = '10';
                  }else{
                      viewAwardPane.innerHTML = defaultHtml;
                      console.log('Target div not found.');
                  }
                })
                .catch(error => {
                  console.error('Error fetching content:', error);
                });
            }else{
                wrapper.style.display = 'none';
                wrapper.style.zIndex = '-10';  // Hides the header when the button is clicked
            }
        });
    } else {
        console.log("No link found in this item.");
    }
});


