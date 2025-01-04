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

const fallApplyHTML = `
<aside>
    <a href="https://uwaterloo.ca/the-centre/forms-and-official-documents/forms-undergraduate-students/fall-term-undergraduate-award-application">
        <div class="call-to-action-wrapper cta-two">
            <div class="call-to-action-theme-uWaterloo">
                <div class="call-to-action-big-text">Fall Term Undergraduate Award Application</div>
            </div>
        </div>
    </a>
</aside>`

const winterApplyHTML = `
<aside>
    <a href="https://uwaterloo.ca/the-centre/forms-and-official-documents/forms-undergraduate-students/winter-term-undergraduate-award-application">
        <div class="call-to-action-wrapper cta-two">
            <div class="call-to-action-theme-uWaterloo">
                <div class="call-to-action-big-text">Winter Term Undergraduate Award Application</div>
            </div>
        </div>
    </a>
</aside>`

const springApplyHTML = `
<aside>
    <a href="https://uwaterloo.ca/the-centre/forms-and-official-documents/forms-undergraduate-students/spring-term-undergraduate-award-application">
        <div class="call-to-action-wrapper cta-two">
            <div class="call-to-action-theme-uWaterloo">
                <div class="call-to-action-big-text">Spring Term Undergraduate Award Application</div>
            </div>
        </div>
    </a>
</aside>`


document.getElementById("site-navigation-wrapper").remove();

// Added Right panel for preview
const sideBar = document.getElementById("site-sidebar-wrapper");
const wrapper = document.createElement('div');
wrapper.classList.add('view-pane--wrapper');
wrapper.style.display = 'none';
sideBar.appendChild(wrapper);
const viewAwardPane = document.createElement('div');
viewAwardPane.classList.add('view-pane');
viewAwardPane.innerHTML = defaultHtml;
wrapper.appendChild(viewAwardPane);

// Added link to applications
const sideFormWrapper = document.getElementById("views-exposed-form-uw-undergrad-award-search-block-page");
const sideForm = sideFormWrapper.firstElementChild.firstElementChild;
const fallApplyButton = document.createElement('div');
fallApplyButton.innerHTML = fallApplyHTML;
sideForm.appendChild(fallApplyButton);
const winterApplyButton = document.createElement('div');
winterApplyButton.innerHTML = winterApplyHTML;
sideForm.appendChild(winterApplyButton);
const springApplyButton = document.createElement('div');
springApplyButton.innerHTML = springApplyHTML;
sideForm.appendChild(springApplyButton);


// Ensures that panel does not block header
const headerHeight = 170;
let scrollPosition = window.scrollY;
if (scrollPosition <= headerHeight) {// If the scroll position is greater than the header's height, stop the pane from going up
    sideBar.style.top = `${headerHeight - scrollPosition + 30}px`;  // Adjust top to prevent overlap
} else {// Otherwise, keep the right pane fixed at the top
    sideBar.style.top = '30px';
}

window.addEventListener('scroll', function() {
    // Get the scroll position from the top
    let scrollPosition = window.scrollY;

    if (scrollPosition <= headerHeight) {// If the scroll position is greater than the header's height, stop the pane from going up
        sideBar.style.top = `${headerHeight - scrollPosition + 30}px`;  // Adjust top to prevent overlap
    } else {// Otherwise, keep the right pane fixed at the top
        sideBar.style.top = '30px';
    }
});

// For every scholarship
document.querySelectorAll('div.views-row').forEach(item => {
    const link = item.querySelector('a');

    if (link) {
        // Get the href attribute
        const href = link.getAttribute('href');

        item.addEventListener('click', function() {

            // Keeps track of the active award
            const otherActive = item.parentElement.querySelector('.active-award');
            item.classList.toggle('active-award');

            if(item.classList.contains('active-award')){
                if (otherActive) {
                  otherActive.classList.remove('active-award');
                }

                fetch(`${link.href}`)  // Fetch the scholarship page
                .then(response => response.text())  
                .then(html => {

                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;

                    // Extract the header and content from the returned HTML
                    const headerDiv = tempDiv.querySelector('.uw-site--title');  
                    const contentDiv = tempDiv.querySelector('.content_node');

                    viewAwardPane.innerHTML = '';

                    // Check if the div exists and insert it into the container
                    if (headerDiv && contentDiv) {

                        // Formats header of side panel
                        const h1Elements = headerDiv.querySelectorAll('h1');  
                        h1Elements.forEach(h1 => {
                            const h2 = document.createElement('h2');  
                            h2.innerHTML = h1.innerHTML;             
                            h1.parentNode.replaceChild(h2, h1);
                        });

                        // Creates close button
                        const closeButton = document.createElement('div');
                        closeButton.classList.add('close');
                        closeButton.innerHTML = '×';  

                        closeButton.addEventListener('click', () => {
                            item.classList.remove('active-award');
                            wrapper.style.display = 'none';
                            wrapper.style.zIndex = '-10';  
                        });

                        // Appends divs to side panel
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
                wrapper.style.zIndex = '-10';  
            }
        });
    } else {
        console.log("No link found in this item.");
    }
});


