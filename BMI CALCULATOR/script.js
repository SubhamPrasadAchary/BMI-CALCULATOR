function calculateBMI() {
    // Get input values
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
    const age = parseInt(document.getElementById('age').value);
    const isMale = document.getElementById('male').checked;

    // Validate inputs
    if (isNaN(weight) || isNaN(height) || isNaN(age) || height <= 0 || weight <= 0) {
        alert('Please enter valid values for weight, height, and age.');
        return;
    }
    
    // Calculate BMI
    const bmi = weight / (height * height);
    const roundedBMI = Math.round(bmi * 10) / 10; // Round to 1 decimal place
    
    // Get BMI category and color
    const { category, color } = getBMICategory(bmi);
    
    // Calculate ideal weight range
    const minNormalWeight = 18.5 * (height * height);
    const maxNormalWeight = 24.9 * (height * height);
    
    // Get recommendation
    const recommendation = getRecommendation(bmi, weight, minNormalWeight, maxNormalWeight, age, isMale);
    
    // Display results
    displayResults(roundedBMI, category, color, recommendation);
}

function getBMICategory(bmi) {
    if (bmi < 16) {
        return { category: 'Severe Thinness', color: '#00fc86ff' };
    } else if (bmi >= 16 && bmi < 17) {
        return { category: 'Moderate Thinness', color: '#179235ff' };
    } else if (bmi >= 17 && bmi < 18.5) {
        return { category: 'Mild Thinness', color: '#468f58ff' };
    } else if (bmi >= 18.5 && bmi < 25) {
        return { category: 'Normal weight', color: '#2ecc71' };
    } else if (bmi >= 25 && bmi < 30) {
        return { category: 'Overweight', color: '#991662ff' };
    } else if (bmi >= 30 && bmi < 35) {
        return { category: 'Obesity Class I', color: '#922f2fff' };
    } else if (bmi >= 35 && bmi < 40) {
        return { category: 'Obesity Class II', color: '#ca3423ff' };
    } else {
        return { category: 'Obesity Class III', color: '#ff0000ff' };
    }
}

function getRecommendation(bmi, currentWeight, minNormalWeight, maxNormalWeight, age, isMale) {
    let recommendation = '';
    
    if (bmi < 18.5) {
        const weightToGain = Math.round((minNormalWeight - currentWeight) * 10) / 10;
        recommendation = `Your weight is below the healthy range. To reach a healthy BMI, you should gain approximately ${weightToGain} kg.`;
        
        if (age < 18) {
            recommendation += ' Since you are under 18, please consult with a healthcare provider for personalized advice, as BMI is interpreted differently for children and teens.';
        } else {
            recommendation += ' Consider increasing your caloric intake with nutrient-dense foods and strength training to build healthy muscle mass.';
        }
        
    } else if (bmi >= 25) {
        const targetWeight = bmi >= 30 ? minNormalWeight : maxNormalWeight;
        const weightToLose = Math.round((currentWeight - targetWeight) * 10) / 10;
        
        if (bmi >= 30) {
            recommendation = `Your BMI indicates obesity. For significant health benefits, aim to lose at least 5-10% of your current body weight. `;
        } else {
            recommendation = `Your weight is above the healthy range. To reach a healthy BMI, you should lose approximately ${weightToLose} kg. `;
        }
        
        recommendation += 'A healthy weight loss goal is 0.5-1 kg per week through a combination of diet and exercise. ';
        
        if (isMale) {
            recommendation += 'For men, focusing on both cardiovascular exercise and strength training can be particularly effective.';
        } else {
            recommendation += 'For women, combining strength training with cardiovascular exercise can help maintain muscle mass while losing fat.';
        }
        
    } else {
        recommendation = 'Your weight is within the healthy range! ';
        
        if (age >= 30) {
            recommendation += 'As you age, maintaining muscle mass becomes increasingly important. Consider incorporating strength training into your routine if you haven\'t already.';
        } else {
            recommendation += 'To maintain your healthy weight, continue with a balanced diet and regular physical activity.';
        }
    }
    
    // Add general health advice
    recommendation += '\n\nGeneral health advice:';
    recommendation += '\n• Eat a variety of fruits, vegetables, lean proteins, and whole grains.';
    recommendation += '\n• Engage in at least 150 minutes of moderate-intensity exercise per week.';
    recommendation += '\n• Get 7-9 hours of quality sleep each night.';
    recommendation += '\n• Manage stress through techniques like meditation, yoga, or deep breathing.';
    recommendation += '\n• Stay hydrated by drinking adequate water throughout the day.';
    
    return recommendation;
}

function displayResults(bmi, category, color, recommendation) {
    // Update BMI value and category
    const bmiValueElement = document.getElementById('bmi-value');
    const bmiCategoryElement = document.getElementById('bmi-category');
    const categoryElement = document.getElementById('category');
    const recommendationElement = document.getElementById('recommendation-text');
    
    bmiValueElement.textContent = bmi;
    bmiValueElement.style.color = color;
    bmiCategoryElement.textContent = `(${category})`;
    bmiCategoryElement.style.color = color;
    categoryElement.textContent = category;
    categoryElement.style.color = color;
    
    // Update recommendation
    recommendationElement.textContent = recommendation;
    
    // Show results section
    document.getElementById('result').classList.remove('hidden');
    
    // Scroll to results
    document.getElementById('result').scrollIntoView({ behavior: 'smooth' });
}

// Add event listener for Enter key
const inputs = document.querySelectorAll('input[type="number"]');
inputs.forEach(input => {
    input.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            calculateBMI();
        }
    });
});
